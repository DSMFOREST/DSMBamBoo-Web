export interface AdminLoginRequestType {
  username: string;
  password: string;
}

export interface UserLoginRequestType {
  device_token: string;
}

export interface AuthorizationTokens {
  access_token: string;
  refresh_token: string;
}

export type CategoryList = { id: number; name: string }[];

export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  facebook_link: string;
  categories: string[];
  images: string[];
  created_at: string;
  recent_created_at: string;
  approved_at: string;
  recent_approved_at: string;
}

export interface PagenationType<T> {
  content: T;
  pageable: {
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  numberOfElements: number;
  first: boolean;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  number: number;
  empty: boolean;
}

export interface PagenationRequestType {
  size: number;
  page: number;
  sort: "createdAt,desc" | "createdAt,asc" | string;
}

export interface ApiPayload<T = null> {
  data?: T;
  status?: number;
}

export interface AccessToken {
  accessToken: string;
}

export type TokenWithType<T> = AccessToken & T;
