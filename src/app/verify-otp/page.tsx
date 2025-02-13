"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import apiClient from "@/services/apiClient";
import authClient from "@/services/authClient";
import SendOTPCodeForm, {
  EmailFormData,
} from "@/components/auth/SendOTPCodeForm";
import SubmitOTPCodeForm, {
  OtpFormData,
} from "@/components/auth/SubmitOTPCodeForm";
import { verifyToken } from "@/lib/base";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [emailSent, setEmailSent] = useState(false);
  const [storedEmail, setStoredEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailForm = useForm<EmailFormData>();
  const otpForm = useForm<OtpFormData>();

  useEffect(() => {
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
      console.log(err.response.data.message);
      setError(err.response.data.message || "Failed to send verification code");
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
      console.log(err.response.data);
      setError(err.response?.data?.message || "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(error);
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
            <SubmitOTPCodeForm
              otpForm={otpForm}
              isLoading={isLoading}
              handleVerifyOtp={handleVerifyOtp}
              storedEmail={storedEmail}
            />
          )}
        </div>
      </div>
    </section>
  );
}
