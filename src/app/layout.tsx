import { ReactNode } from "react";
import MainLayout from "@/components/layout/MainLayout";
import "@fontsource/roboto";

async function getSiteSettings() {
  const res = await fetch(`http://localhost:8002/api-v1/site-settings/`);
  if (!res.ok) throw new Error("Failed to fetch settings");
  return res.json();
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
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

      <body className="font-roboto">
        <MainLayout siteSettings={siteSettings[0]}>{children}</MainLayout>
      </body>
    </html>
  );
}
