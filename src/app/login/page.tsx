"use client";

import { useEffect, useState } from "react";
import {
  RegisterOptions,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import apiClient from "@/services/apiClient";
import authClient from "@/services/authClient";
import LoginForm, { FormData } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();
  // { mode: "onChange" }

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
        className="absolute h-full object-cover w-full"
      />

      <div className="card bg-gray-50 w-full max-w-sm shadow-2xl">
        <div className="p-10">
          <h3 className=" text-2xl font-bold mb-5">Log in to Enter</h3>
          {error && (
            <div className="text-light mb-4 rounded text-sm bg-red-100 p-2 text-red-600">
              {error}
            </div>
          )}

          <LoginForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            isLoading={isLoading}
            isValid={isValid}
          />
        </div>
      </div>
    </section>
  );
}
