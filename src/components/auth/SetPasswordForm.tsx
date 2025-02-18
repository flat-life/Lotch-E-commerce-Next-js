import {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { MdVpnKey } from "react-icons/md";
import { useTranslations } from "next-intl";

export type FormData = {
  current_password: string;
  new_password: string;
  confirmPassword: string;
};

interface SetPasswordFormProps {
  handleSubmit: UseFormHandleSubmit<FormData, undefined>;
  onSubmit: (data: FormData) => Promise<void>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isValid: boolean;
  getValues: UseFormGetValues<FormData>;
  isLoading: boolean;
}

const SetPasswordForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isValid,
  getValues,
  isLoading,
}: SetPasswordFormProps) => {
  const t = useTranslations("SetPasswordForm");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col">
        <div className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-none">
          <MdVpnKey />
          <input
            type="password"
            {...register("current_password", {
              required: t("currentPasswordRequired"),
            })}
            placeholder={t("currentPasswordPlaceholder")}
            className=""
          />
        </div>
        <p>
          {errors.current_password && (
            <p className="text-red-500">{errors.current_password.message}</p>
          )}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-none">
          <MdVpnKey />
          <input
            type="password"
            {...register("new_password", {
              required: t("newPasswordRequired"),
              minLength: {
                value: 8,
                message: t("passwordMinLength"),
              },
            })}
            placeholder={t("newPasswordPlaceholder")}
            className=""
          />
        </div>
        <p>
          {errors.new_password && (
            <p className="text-red-500">{errors.new_password.message}</p>
          )}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-none">
          <MdVpnKey />
          <input
            type="password"
            {...register("confirmPassword", {
              required: t("confirmPasswordRequired"),
              validate: (value) =>
                value === getValues("new_password") || t("passwordsDoNotMatch"),
            })}
            placeholder={t("confirmPasswordPlaceholder")}
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
          t("setPasswordButton")
        )}
      </button>
    </form>
  );
};

export default SetPasswordForm;
