import { ReactNode } from "react";
import MainLayout from "@/components/layout/MainLayout";
import "@fontsource/roboto";
import "@/app/globals.css";
import { appWithTranslation } from "next-i18next";

async function getSiteSettings() {
  const res = await fetch(`http://localhost:8002/api-v1/site-settings/`);
  if (!res.ok) throw new Error("Failed to fetch settings");
  return res.json();
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Casio | Lotch</title>
        <meta name="description" content="Y.A.A" />
        <meta name="author" content="FLATLIFE" />
      </head>

      <body className="font-roboto w-screen">
        <MainLayout siteSettings={siteSettings[0]}>{children}</MainLayout>
      </body>
    </html>
  );
};

export default appWithTranslation(RootLayout);
