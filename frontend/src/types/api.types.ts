// API Response Types
export interface Record {
  _id: string;
  title: string;
  amount: number;
  changeInBalance: "spent" | "added";
  time: Date;
  created_at: string;
}

export interface RecordsResponse {
  success: boolean;
  data: Record[];
}

export interface RecordResponse {
  success: boolean;
  data: Record;
}

export interface LoginResponse {
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
}

export interface RegisterResponse {
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiErrorResponse {
  message: string;
}

