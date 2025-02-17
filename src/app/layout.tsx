import { ReactNode } from "react";
import "@fontsource/roboto";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
