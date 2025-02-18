import { ReactNode } from "react";
import MainLayout from "@/components/layout/MainLayout";
import "@fontsource/roboto";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";

async function getSiteSettings() {
  const res = await fetch(`http://localhost:8002/api-v1/site-settings/`);
  if (!res.ok) throw new Error("Failed to fetch settings");
  return res.json();
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return {
    title: "Casio | Lotch",
    description: "Y.A.A",
    authors: [{ name: "FLATLIFE" }],
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
  };
}

const RootLayout = async ({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: string };
}) => {
  const siteSettings = await getSiteSettings();
  if (!routing.locales.includes(lang as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={lang} dir={lang === "fa" ? "rtl" : "ltr"}>
      <body className="font-roboto w-screen">
        <NextIntlClientProvider locale={lang} messages={messages}>
          <MainLayout siteSettings={siteSettings[0]}>{children}</MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
