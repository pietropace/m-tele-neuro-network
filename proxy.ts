import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { get } from "@vercel/edge-config";

type SiteAccessMode = "public" | "private";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isLoginRoute = createRouteMatcher(["/login(.*)"]);

async function getSiteAccessMode(): Promise<SiteAccessMode> {
  try {
    const mode = await get("siteAccessMode");
    return mode === "private" ? "private" : "public";
  } catch {
    return "public";
  }
}

export default clerkMiddleware(async (auth, req) => {
  const mode = await getSiteAccessMode();
  const shouldProtect = isAdminRoute(req) || (mode === "private" && !isLoginRoute(req));

  if (shouldProtect) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
