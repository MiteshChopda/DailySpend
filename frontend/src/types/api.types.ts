// API Response Types
export interface Record {
  title: string;
  amount: number;
  changeInBalance: "spent" | "added";
  time: Date;
  category: "Food" | "Travel" | "Shopping";
  created_at?: Date;
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

