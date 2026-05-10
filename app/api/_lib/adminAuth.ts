import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await (await clerkClient()).users.getUser(userId);

  if (user.publicMetadata.role !== "admin") {
    redirect("/");
  }

  return user;
}
