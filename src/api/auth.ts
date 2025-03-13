import apiClient from "./apiClient";
import { RegisterResponse } from "@/hooks/useAuth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface OtpRequest {
  email: string;
  purpose: "registration" | "forgotPassword";
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/login", data, {
    headers: { 'Skip-Auth': 'true' }
  });
  return response.data;
};

export const registerApi = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>("/register", data, {
    headers: { 'Skip-Auth': 'true' }
  });
  return response.data;
};