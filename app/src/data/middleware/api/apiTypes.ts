export interface ApiPayload<T = null> {
  data?: T;
  status?: number;
}

export interface AccessToken {
  accessToken: string;
}

export type TokenWithType<T> = AccessToken & T;
