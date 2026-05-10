"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../api/_lib/adminAuth";
import { setSiteAccessMode, type SiteAccessMode } from "../../api/_lib/siteAccessStore";

export async function updateSiteAccessMode(formData: FormData) {
  await requireAdmin();

  const mode = formData.get("mode");
  if (mode !== "public" && mode !== "private") {
    return;
  }

  await setSiteAccessMode(mode satisfies SiteAccessMode);
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
}
