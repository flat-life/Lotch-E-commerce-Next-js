import Link from "next/link";
import { BiSolidUserCircle } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { MdVpnKey } from "react-icons/md";
import {
  SubmitHandler,
  SubmitErrorHandler,
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormGetValues,
} from "react-hook-form";

export type FormData = {
  phone_number: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface RegisterFormProps {
  handleSubmit: UseFormHandleSubmit<FormData, undefined>;
  onSubmit: (data: FormData) => Promise<void>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isLoading: boolean;
  isValid: boolean;
  getValues: UseFormGetValues<FormData>;
}
const RegisterForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isLoading,
  isValid,
  getValues,
}: RegisterFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-none">
          <BiSolidUserCircle />
          <input
            {...register("phone_number", {
              required: "Username is required",
              pattern: {
                value: /^\d{11}$/,
                message: "Invalid phone number format (11 digits)",
              },
            })}
            placeholder="Phone Number"
            className=""
          />
        </div>
        <p>
          {errors.phone_number && (
            <p className="text-red-500">{errors.phone_number.message}</p>
          )}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-none">
          <IoMdMail />
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            className=""
          />
        </div>

        <p>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-none">
          <MdVpnKey />
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
            className=""
          />
        </div>
        <p>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </p>
      </div>

      {/* Confirm Password Input */}
      <div className="flex flex-col">
        <div className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-none">
          <MdVpnKey />
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            placeholder="Confirm Password"
            className=""
          />
        </div>
        <p>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !isValid}
        className="btn px-4 py-2
       disabled:btn-disable w-full rounded-none bg-black hover:bg-gray-600 text-white"
      >
        {isLoading ? (
          <span className="loading loading-infinity loading-md"></span>
        ) : (
          "Register"
        )}
      </button>
      <div className="flex flex-col my-3">
        <p className="text-sm">Already registered?</p>
        <Link className="btn w-full rounded-none bg-gray-300 " href="/login">
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
