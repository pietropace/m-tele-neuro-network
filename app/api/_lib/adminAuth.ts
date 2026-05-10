import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  let user;

  try {
    user = await (await clerkClient()).users.getUser(userId);
  } catch {
    redirect("/");
  }

  if (user.publicMetadata.role !== "admin") {
    redirect("/");
  }

  return user;
}
