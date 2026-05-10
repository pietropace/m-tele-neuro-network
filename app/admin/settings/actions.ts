"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setSiteAccessMode, type SiteAccessMode } from "../../api/_lib/siteAccessStore";

export async function updateSiteAccessMode(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const user = await (await clerkClient()).users.getUser(userId);
  const role = user.publicMetadata.role;

  if (role !== "admin") {
    redirect("/");
  }

  const mode = formData.get("mode");
  if (mode !== "public" && mode !== "private") {
    return;
  }

  await setSiteAccessMode(mode satisfies SiteAccessMode);
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
}
