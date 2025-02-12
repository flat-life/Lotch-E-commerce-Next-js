"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import apiClient from "@/services/apiClient";
import authClient from "@/services/authClient";

type FormData = {
  phone_number: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("JWT");
      if (!token) return;

      try {
        await authClient.post("/auth/jwt/verify/", { token });
        alert("user loged in already");
        router.push("/");
      } catch (err) {
        console.log(err);
        localStorage.removeItem("JWT");
      }
    };

    verifyToken();
  }, [router]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await apiClient.post("/auth/jwt/create/", {
        phone_number: data.phone_number,
        password: data.password,
      });

      if (response.data.access) {
        localStorage.setItem("JWT", response.data.access);
        router.push("/");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Invalid credentials. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="hero  min-h-screen relative">
      <img
        src="/banner/aem-banner-top-g-1920-816.avif"
        alt="Login"
        className="absolute"
      />

      <div className="card bg-gray-50 w-full max-w-sm shadow-2xl">
        <div className="p-10">
          <h3 className=" text-2xl font-bold mb-5">Log in to Enter</h3>
          {error && (
            <div className="text-light mb-4 rounded bg-red-100 p-2 text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("phone_number", {
                  required: "Username is required",
                  pattern: {
                    value: /^\d{11}$/,
                    message: "Invalid phone number format (11 digits)",
                  },
                })}
                placeholder="Phone Number"
                className="input w-full bg-gray-200 rounded-none"
              />
              {errors.phone_number && (
                <p className="text-red-500">{errors.phone_number.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Password"
                className="input w-full bg-gray-200 rounded-none"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-4 items-center justify-between">
              <button
                type="submit"
                disabled={isLoading || !isValid}
                className="btn px-4 py-2
                 disabled:btn-disable w-full rounded-none bg-black hover:bg-gray-600 text-white"
              >
                {isLoading ? (
                  <span className="loading loading-infinity loading-md"></span>
                ) : (
                  "Log In"
                )}
              </button>
              <Link
                href="/verify-otp"
                className="text-gray-600 hover:text-black"
              >
                Login With Code
              </Link>
              <Link
                className="btn w-full rounded-none bg-gray-300 mt-4"
                href="/register"
              >
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
