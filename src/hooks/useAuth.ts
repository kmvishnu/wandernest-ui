import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi, RegisterRequest } from "../api/auth.ts";
import { AxiosError } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { login, logout } from "../store/slices/authSlice";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
}

// Define the error response type
interface LoginErrorResponse {
  message: string;
}

export const useLogin = () => {
  return useMutation<
    LoginResponse,
    AxiosError<LoginErrorResponse>,
    LoginCredentials
  >({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // Handle success (e.g., save token, redirect user)
      // localStorage.setItem('token', data.token);
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
      // Handle error (e.g., show error message)
    },
  });
};

export const useRegister = () => {
  return useMutation<
  RegisterResponse,
    AxiosError<LoginErrorResponse>,
    RegisterRequest
  >({
    mutationFn: registerApi,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // Handle success (e.g., save token, redirect user)
      // localStorage.setItem('token', data.token);
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
      // Handle error (e.g., show error message)
    },
  });
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);

  const loginUser = (token: string) => dispatch(login(token));
  const logoutUser = () => dispatch(logout());

  return { isAuthenticated, token, loginUser, logoutUser };
};


