import ClientLayout from "@/components/layout/ClientLayout";
export default function MainLayout({
  siteSettings,
  children,
}: {
  siteSettings: any;
  children: React.ReactNode;
}) {
  return <ClientLayout siteSettings={siteSettings}>{children}</ClientLayout>;
}
