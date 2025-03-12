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
    // hotels: number[] | null;
  };
}

// Update your login function to use this instance
export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/login", data);
  return response.data;
  // console.log(data)
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({ status: "success", token: "token 2333", user: { id: "1", name: "John Doe", email: "test@gmail.com"} });
  //     // reject({ message: "Invalid email or password" });
  //   }, 2000);
  // });
};

export const registerApi = async (data: RegisterRequest): Promise<RegisterResponse> => {
  // const response = await apiClient.post<RegisterResponse>("/register", data);
  // return response.data;
  console.log(data)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: "success", message: "User registered successfully" });
    }, 2000);
  });
};