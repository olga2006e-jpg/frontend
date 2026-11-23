/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Body_add_maintenance_post_add_post */
export interface BodyAddMaintenancePostAddPost {
  /** Title */
  title: string;
  /**
   * Image Url
   * @default ""
   */
  image_url?: string;
  /**
   * Video Url
   * @default ""
   */
  video_url?: string;
  /**
   * User Id
   * @default 1
   */
  user_id?: number;
}

/** Body_create_maintenance_api_maintenances_post */
export interface BodyCreateMaintenanceApiMaintenancesPost {
  /**
   * Title
   * @minLength 3
   * @maxLength 100
   */
  title: string;
  /** Image */
  image?: File | Blob | null;
  /** Video */
  video?: File | Blob | null;
}

/** Body_publish_maintenance_publish__maintenance_id__post */
export interface BodyPublishMaintenancePublishMaintenanceIdPost {
  /** Description */
  description: string;
  /** Speed Kmh */
  speed_kmh: number;
  /** Price Per Km */
  price_per_km: number;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/**
 * LikeDto
 * 0 = убрать лайк, 1 = поставить.
 */
export interface LikeDto {
  /**
   * Value
   * @min 0
   * @max 1
   */
  value: number;
}

/** UserLoginDto */
export interface UserLoginDto {
  /** Username */
  username: string;
  /** Password */
  password: string;
}

/** UserRegisterDto */
export interface UserRegisterDto {
  /**
   * Username
   * @minLength 3
   * @maxLength 50
   */
  username: string;
  /**
   * Password
   * @minLength 4
   * @maxLength 100
   */
  password: string;
}

/** UserResponseDto */
export interface UserResponseDto {
  /** Id */
  id: number;
  /** Username */
  username: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
  /** Input */
  input?: any;
  /** Context */
  ctx?: object;
}

/**
 * maintenanceCatalogDto
 * Для КАТАЛОГА (GET /api/maintenances).
 * Важно понять: услуга моя (is_mine=1) или чужая (is_mine=0).
 * Поле is_liked здесь НЕ отдаём — в каталоге оно не нужно.
 */
export interface MaintenanceCatalogDto {
  /** Id */
  id: number;
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Status */
  status: string;
  /** Image Url */
  image_url?: string | null;
  /** Video Url */
  video_url?: string | null;
  /** Speed Kmh */
  speed_kmh: number;
  /** Price Per Km */
  price_per_km: number;
  /** Likes */
  likes: number;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /** Published At */
  published_at?: string | null;
  /**
   * Is Mine
   * @default 0
   */
  is_mine?: number;
}

/**
 * maintenanceFeedDto
 * Для ЛЕНТЫ (GET /api/feed, GET /api/feed/{id}/next).
 * Важно понять: текущий пользователь уже лайкнул (is_liked=1) или нет (is_liked=0).
 * Поле is_mine здесь НЕ отдаём — в ленте оно не нужно.
 */
export interface MaintenanceFeedDto {
  /** Id */
  id: number;
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Status */
  status: string;
  /** Image Url */
  image_url?: string | null;
  /** Video Url */
  video_url?: string | null;
  /** Speed Kmh */
  speed_kmh: number;
  /** Price Per Km */
  price_per_km: number;
  /** Likes */
  likes: number;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /** Published At */
  published_at?: string | null;
  /**
   * Is Liked
   * @default 0
   */
  is_liked?: number;
}

/**
 * maintenancePublishDto
 * Вход при публикации.
 */
export interface MaintenancePublishDto {
  /**
   * Description
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /**
   * Speed Kmh
   * @min 0
   */
  speed_kmh: number;
  /**
   * Price Per Km
   * @min 0
   */
  price_per_km: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Логистика.Про API
 * @version 1.0.0
 *
 * API сервиса логистики. Для защищённых методов: /api/users/register → /api/users/login, затем в Swagger → Authorize вставить session_id.
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @name FeedGet
   * @summary Feed
   * @request GET:/
   */
  feedGet = (
    query?: {
      /**
       * User Id
       * @min 1
       * @default 1
       */
      user_id?: number;
      /**
       * Maintenance Id
       * @min 0
       * @default 0
       */
      maintenance_id?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<any, HTTPValidationError>({
      path: `/`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  add = {
    /**
     * No description
     *
     * @name AddMaintenanceAddGet
     * @summary Add Maintenance
     * @request GET:/add
     */
    addMaintenanceAddGet: (
      query?: {
        /**
         * User Id
         * @min 1
         * @default 1
         */
        user_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<any, HTTPValidationError>({
        path: `/add`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name AddMaintenancePostAddPost
     * @summary Add Maintenance Post
     * @request POST:/add
     */
    addMaintenancePostAddPost: (
      data: BodyAddMaintenancePostAddPost,
      params: RequestParams = {},
    ) =>
      this.http.request<any, HTTPValidationError>({
        path: `/add`,
        method: "POST",
        body: data,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),
  };
  catalog = {
    /**
     * No description
     *
     * @name CatalogCatalogGet
     * @summary Catalog
     * @request GET:/catalog
     */
    catalogCatalogGet: (
      query?: {
        /**
         * User Id
         * @min 1
         * @default 1
         */
        user_id?: number;
        /** Tariff From */
        tariff_from?: number | null;
        /** Tariff To */
        tariff_to?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<any, HTTPValidationError>({
        path: `/catalog`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  publish = {
    /**
     * No description
     *
     * @name PublishMaintenancePublishMaintenanceIdPost
     * @summary Publish Maintenance
     * @request POST:/publish/{maintenance_id}
     */
    publishMaintenancePublishMaintenanceIdPost: (
      maintenanceId: number,
      data: BodyPublishMaintenancePublishMaintenanceIdPost,
      params: RequestParams = {},
    ) =>
      this.http.request<any, HTTPValidationError>({
        path: `/publish/${maintenanceId}`,
        method: "POST",
        body: data,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),
  };
  maintenance = {
    /**
     * No description
     *
     * @name DeleteMaintenanceMaintenanceMaintenanceIdDeletePost
     * @summary Delete Maintenance
     * @request POST:/maintenance/{maintenance_id}/delete
     */
    deleteMaintenanceMaintenanceMaintenanceIdDeletePost: (
      maintenanceId: number,
      params: RequestParams = {},
    ) =>
      this.http.request<any, HTTPValidationError>({
        path: `/maintenance/${maintenanceId}/delete`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  api = {
    /**
     * No description
     *
     * @tags maintenances
     * @name ListMaintenancesApiMaintenancesGet
     * @summary List Maintenances
     * @request GET:/api/maintenances
     */
    listMaintenancesApiMaintenancesGet: (
      query?: {
        /** Search */
        search?: string | null;
        /** Tariff From */
        tariff_from?: number | null;
        /** Tariff To */
        tariff_to?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<MaintenanceCatalogDto[], HTTPValidationError>({
        path: `/api/maintenances`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags maintenances
     * @name CreateMaintenanceApiMaintenancesPost
     * @summary Create Maintenance
     * @request POST:/api/maintenances
     */
    createMaintenanceApiMaintenancesPost: (
      data: BodyCreateMaintenanceApiMaintenancesPost,
      params: RequestParams = {},
    ) =>
      this.http.request<MaintenanceCatalogDto, HTTPValidationError>({
        path: `/api/maintenances`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags maintenances
     * @name GetFeedApiFeedGet
     * @summary Get Feed
     * @request GET:/api/feed
     */
    getFeedApiFeedGet: (params: RequestParams = {}) =>
      this.http.request<MaintenanceFeedDto | null, HTTPValidationError>({
        path: `/api/feed`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Возвращает следующую опубликованную услугу после указанной. Если maintenance_id — последний в списке, возвращает первую (циклично).
     *
     * @tags maintenances
     * @name GetNextInFeedApiFeedMaintenanceIdNextGet
     * @summary Get Next In Feed
     * @request GET:/api/feed/{maintenance_id}/next
     */
    getNextInFeedApiFeedMaintenanceIdNextGet: (
      maintenanceId: number,
      query?: {
        /**
         * Next
         * @default true
         */
        next?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<MaintenanceFeedDto, HTTPValidationError>({
        path: `/api/feed/${maintenanceId}/next`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags maintenances
     * @name GetDraftApiDraftsGet
     * @summary Get Draft
     * @request GET:/api/drafts
     */
    getDraftApiDraftsGet: (params: RequestParams = {}) =>
      this.http.request<MaintenanceCatalogDto | null, HTTPValidationError>({
        path: `/api/drafts`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags maintenances
     * @name PublishMaintenanceApiMaintenancesMaintenanceIdPublishPut
     * @summary Publish Maintenance
     * @request PUT:/api/maintenances/{maintenance_id}/publish
     */
    publishMaintenanceApiMaintenancesMaintenanceIdPublishPut: (
      maintenanceId: number,
      data: MaintenancePublishDto,
      params: RequestParams = {},
    ) =>
      this.http.request<MaintenanceCatalogDto, HTTPValidationError>({
        path: `/api/maintenances/${maintenanceId}/publish`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags maintenances
     * @name DeleteMaintenanceApiMaintenancesMaintenanceIdDelete
     * @summary Delete Maintenance
     * @request DELETE:/api/maintenances/{maintenance_id}
     */
    deleteMaintenanceApiMaintenancesMaintenanceIdDelete: (
      maintenanceId: number,
      params: RequestParams = {},
    ) =>
      this.http.request<any, HTTPValidationError>({
        path: `/api/maintenances/${maintenanceId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags maintenances
     * @name LikeMaintenanceApiMaintenancesMaintenanceIdLikePost
     * @summary Like Maintenance
     * @request POST:/api/maintenances/{maintenance_id}/like
     */
    likeMaintenanceApiMaintenancesMaintenanceIdLikePost: (
      maintenanceId: number,
      data: LikeDto,
      params: RequestParams = {},
    ) =>
      this.http.request<any, HTTPValidationError>({
        path: `/api/maintenances/${maintenanceId}/like`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name RegisterApiUsersRegisterPost
     * @summary Регистрация
     * @request POST:/api/users/register
     */
    registerApiUsersRegisterPost: (
      data: UserRegisterDto,
      params: RequestParams = {},
    ) =>
      this.http.request<UserResponseDto, HTTPValidationError>({
        path: `/api/users/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name LoginApiUsersLoginPost
     * @summary Вход (устанавливает cookie session_id)
     * @request POST:/api/users/login
     */
    loginApiUsersLoginPost: (data: UserLoginDto, params: RequestParams = {}) =>
      this.http.request<any, HTTPValidationError>({
        path: `/api/users/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name LogoutApiUsersLogoutPost
     * @summary Выход (удаляет сессию и cookie)
     * @request POST:/api/users/logout
     */
    logoutApiUsersLogoutPost: (params: RequestParams = {}) =>
      this.http.request<any, HTTPValidationError>({
        path: `/api/users/logout`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
}
