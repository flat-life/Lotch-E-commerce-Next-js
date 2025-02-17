"use client";
import { Address } from "@/lib/profile";
import authClient from "@/services/authClient";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

export const AddressesTab = ({
  addresses,
  onUpdate,
}: {
  addresses: Address[];
  onUpdate: () => void;
}) => {
  const t = useTranslations("AddressesTab");

  const { register, handleSubmit, reset, setValue } = useForm<Address>();
  const [editingId, setEditingId] = useState<number | null>(null);

  const onSubmit = async (data: Address) => {
    try {
      if (editingId) {
        await authClient.put(`/addresses/${editingId}/`, data);
      } else {
        await authClient.post("/addresses/", data);
      }
      onUpdate();
      reset();
      setEditingId(null);
    } catch (error) {
      console.error("Address operation failed:", error);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    Object.entries(address).forEach(([key, value]) => {
      setValue(key as keyof Address, value);
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await authClient.delete(`/addresses/${id}/`);
      onUpdate();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>{t("zipCode")}</th>
            <th>{t("province")}</th>
            <th>{t("city")}</th>
            <th>{t("path")}</th>
            <th>{t("default")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address) => (
            <tr key={address.id}>
              <td>{address.zip_code}</td>
              <td>{address.province}</td>
              <td>{address.city}</td>
              <td>{address.path}</td>
              <td>{address.default ? t("yes") : t("no")}</td>
              <td className="flex gap-4">
                <button
                  className="btn bg-black rounded-none text-white"
                  onClick={() => handleEdit(address)}
                >
                  {t("edit")}
                </button>
                <button
                  className="btn bg-gray-300 rounded-none text-black"
                  onClick={() => handleDelete(address.id)}
                >
                  {t("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 form-control">
        <div className="flex flex-col space-y-2">
          <div className="col-md-6">
            <input
              {...register("zip_code")}
              placeholder={t("zipCodePlaceholder")}
              className="input"
            />
          </div>
          <div className="">
            <input
              {...register("province")}
              placeholder={t("provincePlaceholder")}
              className="input"
            />
          </div>
          <div className="">
            <input
              {...register("city")}
              placeholder={t("cityPlaceholder")}
              className="input"
            />
          </div>
          <div className="">
            <input
              {...register("path")}
              placeholder={t("pathPlaceholder")}
              className="input"
            />
          </div>
          <div className="">
            <label className="label cursor-pointer w-fit ">
              <input
                type="checkbox"
                {...register("default")}
                className="checkbox rounded-none [--chkbg:theme(colors.black)]"
              />
              <span className="label-text mx-5 font-bold">
                {t("defaultLabel")}
              </span>
            </label>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="btn bg-black rounded-none text-white"
            >
              {editingId ? t("updateAddress") : t("addAddress")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
