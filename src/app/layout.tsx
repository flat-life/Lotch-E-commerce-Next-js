import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lotch",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">

      <title>Lotch Shop</title>
      <meta name="description" content="Y.A.A" />
      <meta name="author" content="Y.A.A" />

      <body>
        {children}
      </body>
    </html>
  );
}
