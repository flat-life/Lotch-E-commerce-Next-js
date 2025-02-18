"use client";
import Link from "next/link";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdVpnKey } from "react-icons/md";
import { useTranslations } from "next-intl";

export type FormData = {
  phone_number: string;
  password: string;
};

interface LoginFormProps {
  handleSubmit: UseFormHandleSubmit<FormData, undefined>;
  onSubmit: SubmitHandler<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isLoading: boolean;
  isValid: boolean;
}

const LoginForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isLoading,
  isValid,
}: LoginFormProps) => {
  const t = useTranslations("LoginForm");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Phone Number Input */}
      <div>
        <div className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-none">
          <BiSolidUserCircle />
          <input
            {...register("phone_number", {
              required: t("phoneRequired"),
              pattern: {
                value: /^\d{11}$/,
                message: t("invalidPhoneFormat"),
              },
            })}
            placeholder={t("phonePlaceholder")}
            className=""
          />
        </div>
        <p>
          {errors.phone_number && (
            <p className="text-red-500">{errors.phone_number.message}</p>
          )}
        </p>
      </div>

      {/* Password Input */}
      <div className="flex flex-col">
        <div className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-none">
          <MdVpnKey />
          <input
            type="password"
            {...register("password", {
              required: t("passwordRequired"),
              minLength: {
                value: 8,
                message: t("passwordMinLength"),
              },
            })}
            placeholder={t("passwordPlaceholder")}
            className=""
          />
        </div>
        <p>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </p>
      </div>

      {/* Buttons and Links */}
      <div className="flex flex-col space-y-4 items-center justify-between">
        <button
          type="submit"
          disabled={isLoading || !isValid}
          className="btn px-4 py-2 disabled:btn-disable w-full rounded-none bg-black hover:bg-gray-600 text-white"
        >
          {isLoading ? (
            <span className="loading loading-infinity loading-md"></span>
          ) : (
            t("logIn")
          )}
        </button>

        <Link href="/verify-otp" className="text-gray-600 hover:text-black">
          {t("loginWithCode")}
        </Link>

        <div className="flex flex-col my-3 w-full">
          <p className="text-sm">{t("newToSite")}</p>
          <Link
            className="btn w-full rounded-none bg-gray-300"
            href="/register"
          >
            {t("createAccount")}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
