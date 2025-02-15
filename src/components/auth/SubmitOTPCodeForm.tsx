import { UseFormReturn } from "react-hook-form";
import { MdVpnKey } from "react-icons/md";

export type OtpFormData = {
  otp: string;
};

interface SubmitOTPCodeFormProps {
  otpForm: UseFormReturn<OtpFormData, any, undefined>;
  handleVerifyOtp: (data: OtpFormData) => Promise<void>;
  isLoading: boolean;
  storedEmail: string | null;
}

const SubmitOTPCodeForm = ({
  otpForm,
  handleVerifyOtp,
  isLoading,
  storedEmail,
}: SubmitOTPCodeFormProps) => {
  //   console.log();
  return (
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
      <p className="mt-4 text-center text-sm">Code sent to: {storedEmail}</p>
    </form>
  );
};

export default SubmitOTPCodeForm;
