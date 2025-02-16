import { ReactNode } from "react";
import MainLayout from "@/components/layout/MainLayout";
import "@fontsource/roboto";
import "@/app/[lang]/globals.css";
import { NextIntlClientProvider } from "next-intl";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
