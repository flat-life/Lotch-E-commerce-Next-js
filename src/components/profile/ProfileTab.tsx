"use client";
import { useForm } from "react-hook-form";
import { CustomerData, UserData } from "@/lib/profile";
import { useEffect } from "react";
import authClient from "@/services/authClient";
import { useTranslations } from "next-intl";

export const ProfileTab = ({
  customerData,
  userData,
  onUpdateCustomer,
  onUpdateUser,
}: {
  customerData: CustomerData | null;
  userData: UserData | null;
  onUpdateCustomer: () => void;
  onUpdateUser: () => void;
}) => {
  const t = useTranslations("ProfileTab");

  const customerForm = useForm({ defaultValues: customerData || {} });
  const userForm = useForm({ defaultValues: userData || {} });
  const passForm = useForm();

  useEffect(() => {
    if (customerData) customerForm.reset(customerData);
    if (userData) userForm.reset(userData);
  }, [customerData, userData]);

  const handleCustomerSubmit = async (data: any) => {
    try {
      await authClient.put("/customers/me/", data);
      onUpdateCustomer();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleUserSubmit = async (data: any) => {
    try {
      await authClient.put("/auth/users/me/", data);
      onUpdateUser();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handlePasswordSubmit = async (data: any) => {
    try {
      await authClient.post("/auth/users/set_password/", data);
      passForm.reset();
    } catch (error) {
      console.error("Password change failed:", error);
    }
  };

  return (
    <div className="">
      <div className="">
        <form onSubmit={customerForm.handleSubmit(handleCustomerSubmit)}>
          <h5 className="mb-4">{t("personalInformation")}</h5>
          <div className="mb-3">
            <input
              {...customerForm.register("first_name")}
              placeholder={t("firstNamePlaceholder")}
              className="input"
            />
          </div>
          <div className="mb-3">
            <input
              {...customerForm.register("last_name")}
              placeholder={t("lastNamePlaceholder")}
              className="input"
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              {...customerForm.register("birth_date")}
              className="input"
            />
          </div>
          <button
            type="submit"
            className="btn bg-black text-white rounded-none"
          >
            {t("saveChanges")}
          </button>
        </form>
      </div>
      <div className="my-10">
        <form
          onSubmit={userForm.handleSubmit(handleUserSubmit)}
          className="my-10"
        >
          <h5 className="mb-3">{t("accountInformation")}</h5>
          <div className="mb-3">
            <input
              type="email"
              {...userForm.register("email")}
              placeholder={t("emailPlaceholder")}
              className="input rounded-none"
            />
          </div>
          <button
            type="submit"
            className="btn bg-black rounded-none text-white"
          >
            {t("updateEmail")}
          </button>
        </form>
        <form onSubmit={passForm.handleSubmit(handlePasswordSubmit)}>
          <h5 className="mb-3">{t("changePassword")}</h5>
          <div className="mb-3">
            <input
              type="password"
              {...passForm.register("current_password")}
              placeholder={t("currentPasswordPlaceholder")}
              className="input"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              {...passForm.register("new_password")}
              placeholder={t("newPasswordPlaceholder")}
              className="input"
            />
          </div>
          <button
            type="submit"
            className="btn bg-black rounded-none text-white"
          >
            {t("changePasswordButton")}
          </button>
        </form>
      </div>
    </div>
  );
};
