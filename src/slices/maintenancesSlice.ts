import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import type { MaintenanceDto } from '../types';
import { MOCK_MAINTENANCES, MOCK_LIKED_IDS } from '../data/mock';
import type { RootState } from '../store';

interface Filter {
  from: number;
  to: number;
}

interface MaintenancesState {
  items: MaintenanceDto[];
  filter: Filter;
  loading: boolean;
  likedIds: number[];
  error: string | null;
  isMockMode: boolean;
}

const initialState: MaintenancesState = {
  items: [],
  filter: { from: 0, to: 1000 },
  loading: false,
  likedIds: MOCK_LIKED_IDS,
  error: null,
  isMockMode: false,
};

export const getMaintenancesList = createAsyncThunk(
  'maintenances/getList',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { from, to } = state.maintenances.filter;
    const isGuest = !state.user.isAuthenticated;

    try {
      const response = await api.api.listMaintenancesApiMaintenancesGet({
        tariff_from: from,
        tariff_to: to,
      });
      return response.data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image_url: item.image_url ?? undefined,
        video_url: item.video_url ?? undefined,
        speed_kmh: item.speed_kmh,
        price_per_km: item.price_per_km,
        likes: item.likes,
      })) as MaintenanceDto[];
    } catch {
      return rejectWithValue({ message: 'Сервер недоступен', isGuest });
    }
  }
);

export const createMaintenance = createAsyncThunk(
  'maintenances/create',
  async (
    data: {
      title: string;
      description: string;
      speed_kmh: number;
      price_per_km: number;
      image?: File | null;
      video?: File | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const draftRes = await api.api.createMaintenanceApiMaintenancesPost({
        title: data.title,
        image: data.image ?? undefined,
        video: data.video ?? undefined,
      });

      const pubRes = await api.api.publishMaintenanceApiMaintenancesMaintenanceIdPublishPut(
        draftRes.data.id,
        {
          description: data.description,
          speed_kmh: data.speed_kmh,
          price_per_km: data.price_per_km,
        }
      );

      const item = pubRes.data;
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        image_url: item.image_url ?? undefined,
        video_url: item.video_url ?? undefined,
        speed_kmh: item.speed_kmh,
        price_per_km: item.price_per_km,
        likes: item.likes,
      } as MaintenanceDto;
    } catch {
      return rejectWithValue('Ошибка при создании и публикации транспорта');
    }
  }
);

export const deleteMaintenance = createAsyncThunk(
  'maintenances/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.api.deleteMaintenanceApiMaintenancesMaintenanceIdDelete(id);
      return id;
    } catch {
      return rejectWithValue('Ошибка при удалении записи');
    }
  }
);

export const toggleLikeMaintenance = createAsyncThunk(
  'maintenances/toggleLike',
  async (id: number, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const isCurrentlyLiked = state.maintenances.likedIds.includes(id);
    const nextValue = isCurrentlyLiked ? 0 : 1;

    try {
      const response = await api.api.likeMaintenanceApiMaintenancesMaintenanceIdLikePost(id, {
        value: nextValue,
      });
      return { id, isLiked: nextValue === 1, data: response.data };
    } catch {
      return rejectWithValue('Ошибка при обновлении лайка');
    }
  }
);

const maintenancesSlice = createSlice({
  name: 'maintenances',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    resetFilter: (state) => {
      state.filter = { from: 0, to: 1000 };
    },
    clearMaintenances: (state) => {
      state.items = [];
      state.filter = { from: 0, to: 1000 };
      state.error = null;
      state.isMockMode = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMaintenancesList.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isMockMode = false;
      })
      .addCase(getMaintenancesList.rejected, (state, action) => {
        const payload = action.payload as { message: string; isGuest: boolean } | undefined;
        state.error = payload?.message ?? 'Ошибка загрузки данных';
        if (payload?.isGuest) {
          const { from, to } = state.filter;
          state.items = MOCK_MAINTENANCES.filter(
            (m) => m.price_per_km >= from && m.price_per_km <= to
          );
          state.isMockMode = true;
        }
      })
      .addCase(createMaintenance.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteMaintenance.fulfilled, (state, action) => {
        state.items = state.items.filter((m) => m.id !== action.payload);
      })
      .addCase(toggleLikeMaintenance.fulfilled, (state, action) => {
        const { id, isLiked, data } = action.payload;
        const idx = state.items.findIndex((m) => m.id === id);
        if (idx !== -1) {
          if (typeof data?.likes === 'number') {
            state.items[idx].likes = data.likes;
          } else {
            state.items[idx].likes += isLiked ? 1 : -1;
          }
        }
        if (isLiked) {
          if (!state.likedIds.includes(id)) state.likedIds.push(id);
        } else {
          state.likedIds = state.likedIds.filter((likedId) => likedId !== id);
        }
      })
      .addMatcher(
        (action) => action.type.startsWith('maintenances/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('maintenances/') &&
          (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setFilter, resetFilter, clearMaintenances } = maintenancesSlice.actions;
export default maintenancesSlice.reducer;
