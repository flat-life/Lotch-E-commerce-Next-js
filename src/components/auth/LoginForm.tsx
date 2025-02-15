import Link from "next/link";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdVpnKey } from "react-icons/md";

export type FormData = {
  phone_number: string;
  password: string;
};
interface LoginFormProps {
  handleSubmit: UseFormHandleSubmit<FormData, undefined>;
  onSubmit: (data: FormData) => Promise<void>;
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
        <Link href="/verify-otp" className="text-gray-600 hover:text-black">
          Login With Code
        </Link>
        <div className="flex flex-col my-3 w-full">
          <p className="text-sm">New to Site ?</p>
          <Link
            className="btn w-full rounded-none bg-gray-300 "
            href="/register"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
