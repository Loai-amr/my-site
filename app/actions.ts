"use server";

import { cookies } from "next/headers";
import { LANG_COOKIE } from "@/lib/i18n";

/** Language toggle. A plain form + server action, so it works before (or without) JavaScript. */
export async function setLang(formData: FormData) {
  const lang = formData.get("lang") === "ar" ? "ar" : "en";
  (await cookies()).set(LANG_COOKIE, lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
}
