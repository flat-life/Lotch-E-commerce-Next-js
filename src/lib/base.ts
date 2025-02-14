import authClient from "@/services/authClient";
import router from "next/navigation";

export function getCSRFToken(): string {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];

  console.log(document.cookie);
  console.log(cookieValue);
  if (!cookieValue) {
    throw new Error("CSRF token not found");
  }

  return cookieValue;
}

export const verifyToken = async () => {
  const token = localStorage.getItem("JWT");
  if (!token) return "";

  try {
    await authClient.post("/auth/jwt/verify/", { token });
  } catch (err) {
    console.log(err);
    localStorage.removeItem("JWT");
    return "";
  }
  return token;
};
