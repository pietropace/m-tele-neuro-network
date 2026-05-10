"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setSiteAccessMode, type SiteAccessMode } from "../../api/_lib/siteAccessStore";

export async function updateSiteAccessMode(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const mode = formData.get("mode");
  if (mode !== "public" && mode !== "private") {
    return;
  }

  await setSiteAccessMode(mode satisfies SiteAccessMode);
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
}
