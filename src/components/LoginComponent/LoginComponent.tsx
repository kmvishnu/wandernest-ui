import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import InputField from "../Common/InputField.tsx";
import { COPYRIGHT, COPYRIGHT_URL, API_URL } from "../../../config";
import { useLogin } from "@/hooks/useAuth.ts";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice.ts";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showTestCredentials, setShowTestCredentials] = useState(true);

  useEffect(() => {
    const URL = API_URL.replace("/v1", "");
    fetch(`${URL}/healthCheck`);
    
    // Hide test credentials after 5 seconds
    const timer = setTimeout(() => {
      setShowTestCredentials(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    setValue, // Add setValue from useForm
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { mutate: loginFunction, isPending, isError, error } = useLogin();

  const onSubmit = (data: LoginFormInputs) => {
    loginFunction(data, {
      onSuccess: (data) => {
        dispatch(login(data));
        navigate("/");
      },
    });
  };

  const fillTestCredentials = () => {
    setValue("email", "test1@gmail.com");
    setValue("password", "test");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Email Address *"
            register={register("email")}
            error={errors.email}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Password *"
            register={register("password")}
            error={errors.password}
          />
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 font-semibold rounded-md focus:outline-none ${
              isPending
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            }`}
          >
            {isPending ? "Logging in..." : "Log In"}
          </button>
        </form>

        {isError && (
          <div className="my-4 p-4 rounded-md bg-red-50 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7h2v2h-2zm0-4h2v4h-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error?.message || "An error occurred. Please try again."}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-center flex justify-between">
          <p className="text-sm text-gray-600">
            <span className="sm:block hidden">Don't have an account? </span>
            <button
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
          <p className="text-sm text-gray-600">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          </p>
        </div>

        {/* Test Credentials Section */}
        {showTestCredentials && (
          <div className="mt-6 mb-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-md animate-pulse transition-opacity duration-1500 ease-in-out">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-700">Test Credentials</h3>
                <div className="mt-1 text-sm text-blue-600">
                  <p>Email: test1@gmail.com</p>
                  <p>Password: test</p>
                </div>
                <button 
                  onClick={fillTestCredentials}
                  className="mt-1 px-2 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors"
                >
                  Auto-fill
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            <a
              href={`${COPYRIGHT_URL}`}
              className="text-grey-600 hover:underline"
            >
              {`${COPYRIGHT}`}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;