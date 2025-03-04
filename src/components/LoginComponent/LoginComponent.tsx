import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import InputField from "../Common/InputField.tsx";
import { COPYRIGHT, COPYRIGHT_URL } from "../../../config";
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


  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { mutate: loginFunction, isPending, isError, error } = useLogin();

  const onSubmit = (data: LoginFormInputs) => {
    loginFunction(data, {
      onSuccess: ( data) => {
        dispatch(login(data));
        navigate("/");
      },
    });
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
          {/* <p className="text-sm text-gray-600">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </p> */}
          <p className="text-sm text-gray-600">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          </p>
        </div>
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
