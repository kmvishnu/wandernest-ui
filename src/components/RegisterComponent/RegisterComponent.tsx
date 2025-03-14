import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "../Common/InputField.tsx";
import { useNavigate } from "react-router-dom";
import { COPYRIGHT, COPYRIGHT_URL } from "../../../config";
import { useRegister } from "@/hooks/useAuth.ts";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

const RegisterComponent: React.FC = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
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
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const { mutate: registerUser, isPending, isError, error } = useRegister();

  const onSubmit = (data: RegisterFormInputs) => {

    registerUser(
      { email: data.email, name: data.name, password: data.password },
      {
        onSuccess: () => {
          setShowSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            id="name"
            label="Name"
            type="text"
            placeholder="Name *"
            register={register("name")}
            error={errors.name}
          />

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
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {showSuccess && (
                <div className="my-4 p-4 rounded-md bg-green-50 border border-green-200">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        Registered successfully, Redirecting to the login page
                      </p>
                    </div>
                  </div>
                </div>
              )}

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


        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <button
              onClick={() => navigate("/")}
              className="text-blue-500 hover:underline ml-1"
            >
              Log In
            </button>
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            <a href={COPYRIGHT_URL} className="text-grey-600 hover:underline">
              {COPYRIGHT}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
