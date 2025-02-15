import { UseFormReturn } from "react-hook-form";
import { IoMdMail } from "react-icons/io";

export type EmailFormData = {
  email: string;
};
interface SendOTPCodeFormProps {
  emailForm: UseFormReturn<EmailFormData, any, undefined>;
  handleSendCode: (data: EmailFormData) => Promise<void>;
  isLoading: boolean;
}

const SendOTPCodeForm = ({
  emailForm,
  handleSendCode,
  isLoading,
}: SendOTPCodeFormProps) => {
  //   console.log(emailForm.formState.errors);
  return (
    <form
      onSubmit={emailForm.handleSubmit(handleSendCode)}
      className="space-y-4"
    >
      <div className="flex flex-col">
        <div className="input input-bordered flex items-center gap-2 bg-gray-200 rounded-none">
          <IoMdMail />
          <input
            type="email"
            {...emailForm.register("email", {
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
          {emailForm.formState.errors.email && (
            <p className="text-red-500">
              {emailForm.formState.errors.email.message}
            </p>
          )}
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !emailForm.formState.isValid}
        className="btn px-4 py-2
         disabled:btn-disable w-full rounded-none bg-black hover:bg-gray-600 text-white"
      >
        {isLoading ? (
          <span className="loading loading-infinity loading-md"></span>
        ) : (
          "Send Code"
        )}
      </button>
    </form>
  );
};

export default SendOTPCodeForm;
