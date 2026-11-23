// import { useState, useMemo } from "react";
// import { MOCK_MAINTENANCES } from "../data/mock";
// import type { MaintenanceDto } from "../types";
// import MaintenanceCard from "../components/MaintenanceCard";
// import TariffFilter from "../components/TariffFilter";
// import BottomNav from "../components/BottomNav";

// export default function CatalogPage() {
//   const [items, setItems] = useState<MaintenanceDto[]>(MOCK_MAINTENANCES);
//   const [draftFrom, setDraftFrom] = useState(0);
//   const [draftTo, setDraftTo] = useState(1000);
//   const [appliedFrom, setAppliedFrom] = useState(0);
//   const [appliedTo, setAppliedTo] = useState(1000);

//   const filtered = useMemo(
//     () => items.filter((m) => m.price_per_km >= appliedFrom && m.price_per_km <= appliedTo),
//     [items, appliedFrom, appliedTo]
//   );

//   const handleSearch = () => {
//     setAppliedFrom(draftFrom);
//     setAppliedTo(draftTo);
//   };

//   const handleDelete = (id: number) => setItems((prev) => prev.filter((m) => m.id !== id));

//   return (
//     <main className="phone app-page catalog-page">
//       <section className="page-content">
//         <div className="page-card">
//           <h1 className="page-card-title">Выбор транспорта и фильтрация по тарифу</h1>

//           <TariffFilter
//             from={draftFrom}
//             to={draftTo}
//             onChangeFrom={setDraftFrom}
//             onChangeTo={setDraftTo}
//             onSubmit={handleSearch}
//           />

//           <div className="maintenance-grid">
//             {filtered.map((item) => (
//               <MaintenanceCard key={item.id} item={item} onDelete={handleDelete} />
//             ))}
//           </div>

//           {filtered.length === 0 && (
//             <p style={{ textAlign: "center", color: "#6B7A99", marginTop: "16px" }}>
//               Ничего не найдено
//             </p>
//           )}
//         </div>
//       </section>
//       <BottomNav />
//     </main>
//   );
// }


import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import MaintenanceCard from "../components/MaintenanceCard";
import TariffFilter from "../components/TariffFilter";
import BottomNav from "../components/BottomNav";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getMaintenancesList,
  deleteMaintenance,
  setFilter,
} from "../slices/maintenancesSlice";

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const { items, filter, loading, error } = useAppSelector((s) => s.maintenances);

  useEffect(() => {
    dispatch(getMaintenancesList());
  }, [dispatch]);

  const handleSearch = () => {
    if (!loading) {
      dispatch(getMaintenancesList());
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteMaintenance(id));
  };

  return (
    <main className="phone app-page catalog-page">
      <section className="page-content">
        <div className="page-card">
          <h1 className="page-card-title">Выбор транспорта и фильтрация по тарифу</h1>

          <TariffFilter
            from={filter.from}
            to={filter.to}
            onChangeFrom={(v) => dispatch(setFilter({ ...filter, from: v }))}
            onChangeTo={(v) => dispatch(setFilter({ ...filter, to: v }))}
            onSubmit={handleSearch}
          />

          {loading && (
            <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {error && !loading && (
            <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "12px", marginBottom: "10px" }}>
              {error} (используются локальные данные)
            </p>
          )}

          <div className="maintenance-grid">
            {items.map((item) => (
              <MaintenanceCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                isLoading={loading}
              />
            ))}
          </div>

          {!loading && items.length === 0 && (
            <p style={{ textAlign: "center", color: "#6B7A99", marginTop: "16px" }}>
              Ничего не найдено
            </p>
          )}
        </div>
      </section>
      <BottomNav />
    </main>
  );
}
