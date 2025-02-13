"use client";

import { useEffect, useState } from "react";
import {
  ErrorOption,
  Field,
  FieldArray,
  FieldArrayPath,
  FieldError,
  FieldErrors,
  FieldName,
  FieldRefs,
  FieldValues,
  FormState,
  InternalFieldName,
  Path,
  PathValue,
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
import { IoMdMail } from "react-icons/io";
import SendOTPCodeForm, {
  EmailFormData,
} from "@/components/auth/SendOTPCodeForm";
import { MdVpnKey } from "react-icons/md";

type OtpFormData = {
  otp: string;
};

export default function VerifyOtpPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [emailSent, setEmailSent] = useState(false);
  const [storedEmail, setStoredEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailForm = useForm<EmailFormData>();
  const otpForm = useForm<OtpFormData>();

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
    setStoredEmail(localStorage.getItem("email"));
  }, [router]);

  const handleSendCode = async (data: EmailFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await apiClient.post("/login-otp/", {
        email: data.email,
      });

      if (response.status === 201) {
        localStorage.setItem("email", data.email);
        setEmailSent(true);
        setStoredEmail(data.email);
        alert("Verification code sent to your email");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (data: OtpFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await apiClient.post("/verify-otp/", {
        email: storedEmail,
        otp: data.otp,
      });

      if (response.data.access) {
        localStorage.setItem("JWT", response.data.access);
        alert("Login successful!");
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="hero  min-h-screen relative">
      <img
        src="banner/banner-digital-glitch-pc.webp"
        alt="Login"
        className="absolute h-full object-cover w-full"
      />

      <div className="card bg-gray-50 w-full max-w-sm shadow-2xl">
        <div className="p-10">
          <h3 className=" text-2xl font-bold mb-5">Login with Email</h3>
          {error && (
            <div className="text-light mb-4 rounded text-sm bg-red-100 p-2 text-red-600">
              {error}
            </div>
          )}

          {!emailSent ? (
            <SendOTPCodeForm
              emailForm={emailForm}
              handleSendCode={handleSendCode}
              isLoading={isLoading}
            />
          ) : (
            <>
              <form
                onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
                className="space-y-4"
              >
                <div className="flex flex-col">
                  <div className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-none">
                    <MdVpnKey />
                    <input
                      type="text"
                      {...otpForm.register("otp", {
                        required: "Verification code is required",
                        minLength: {
                          value: 6,
                          message: "Verification must be 6 characters",
                        },
                        maxLength: {
                          value: 6,
                          message: "Verification must be 6 characters",
                        },
                      })}
                      placeholder="Verification Code"
                      className=""
                    />
                  </div>
                  <p>
                    {otpForm.formState.errors.otp && (
                      <p className="text-red-500">
                        {otpForm.formState.errors.otp.message}
                      </p>
                    )}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !otpForm.formState.isValid}
                  className="btn px-4 py-2
       disabled:btn-disable w-full rounded-none bg-black hover:bg-gray-600 text-white"
                >
                  {isLoading ? (
                    <span className="loading loading-infinity loading-md"></span>
                  ) : (
                    "Verify"
                  )}
                </button>
              </form>
              <p className="mt-4 text-center">Code sent to: {storedEmail}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
