// API Response Types
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success?: false;
  message: string;
}

export interface AuthSuccessResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

