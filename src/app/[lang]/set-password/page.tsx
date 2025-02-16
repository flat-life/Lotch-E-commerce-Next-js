"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import authClient from "@/services/authClient";
import SetPasswordForm, { FormData } from "@/components/auth/SetPasswordForm";
import { verifyToken } from "@/lib/base";

export default function SetPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>();

  useEffect(() => {
    verifyToken();
  }, [router]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await authClient.post("/auth/users/set_password/", {
        current_password: data.current_password,
        new_password: data.new_password,
      });

      if (response.status === 204) {
        alert("Password changed successfully!");
        router.push("/profile");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Password change failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="hero  min-h-screen relative">
      <img
        src="/banner/HSHeroBanner_3840x1448px_CASIO.webp"
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

          <SetPasswordForm
            getValues={getValues}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            register={register}
            isLoading={isLoading}
            isValid={isValid}
          />
        </div>
      </div>
    </section>
  );
}
