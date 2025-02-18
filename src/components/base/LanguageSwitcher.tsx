"use client";

import apiClient from "@/services/apiClient";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (newLocale: string) => {
    startTransition(async () => {
      // await apiClient.post("/set_language/", { language_code: newLocale });

      const segments = pathname.split("/");
      segments[1] = newLocale;
      router.push(segments.join("/"));
    });
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")} disabled={isPending}>
        English
      </button>
      <button onClick={() => changeLanguage("fa")} disabled={isPending}>
        فارسی
      </button>
    </div>
  );
}
