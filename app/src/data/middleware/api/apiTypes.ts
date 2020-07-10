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

export type CategoryItem = { id: number; name: string };

export interface NoticeDetailRequestType {
  id: string;
}

export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  facebook_link: string;
  categories: string[];
  images: string[];
  created_at: string;
  recent_created_at: string;
  approved_at?: string;
  recent_approved_at?: string;
}

export interface DraftsItem {
  id: number;
  title: string;
  content: string;
  facebook_link: string;
  categories: string[];
  images: string[];
  created_at: string;
  recent_created_at: string;
}

export interface ImageUploadRequestType {
  images: File[];
}

export interface TransformImages {
  images: Array<{
    id: number;
    url: string;
  }>;
}

export interface CommunityRules {
  rules: string[];
}

export interface PostNoticeRequestType {
  title: string;
  content: string;
  categories: number[];
  images: number[];
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
    page_size: number;
    page_number: number;
    paged: boolean;
    unpaged: boolean;
  };
  total_pages: number;
  total_elements: number;
  last: boolean;
  size: number;
  number_of_elements: number;
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

export interface DecodingToken {
  sub: string;
  roles: ["ROLE_ANONYMOUS" | "ROLE_ADMIN"];
  iss: string;
  exp: number;
  iat: number;
}

export interface DeviceToken {
  device_token: string;
}

export interface AccessToken {
  accessToken: string;
}

export interface RefreshToken {
  refresh_token: string;
}

export type TokenWithType<T> = AccessToken & T;
