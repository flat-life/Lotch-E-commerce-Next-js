"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import authClient from "@/services/authClient";
import apiClient from "@/services/apiClient";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdVpnKey } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import RegisterForm, { FormData } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("JWT");
      if (!token) return;

      try {
        await authClient.post("/auth/jwt/verify/", { token });
        router.push("/");
      } catch (err) {
        localStorage.removeItem("JWT");
      }
    };

    verifyToken();
  }, [router]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await apiClient.post("/auth/users/", {
        phone_number: data.phone_number,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        localStorage.setItem("email", data.email);
        alert("Your account is active now. Please login!");
        router.push("/login");
      } else {
        console.log("response err");
        setError(response.data);
      }
    } catch (err: any) {
      console.log({ err: err.response.data });
      setError(
        err.response.data.phone_number ||
          err.response.data.email ||
          err.response.data.password ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="hero  min-h-screen relative">
      <img
        src="/banner/banner-dw-5600jah24-4-pc.webp"
        alt="Login"
        className="absolute h-full object-cover w-full"
      />

      <div className="card bg-gray-50 w-full max-w-sm shadow-2xl">
        <div className="p-10">
          <h3 className="text-2xl font-bold mb-5">Register</h3>
          {error && (
            <div className="text-light mb-4 text-sm rounded bg-red-100 p-2 text-red-600">
              {error}
            </div>
          )}
          <RegisterForm
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
