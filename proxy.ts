import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { get } from "@vercel/edge-config";

type SiteAccessMode = "public" | "private";

const isAdminRoute = createRouteMatcher(["/admin(.*)", "/studio(.*)"]);
const isLoginRoute = createRouteMatcher(["/login(.*)"]);
const isPublicApiRoute = createRouteMatcher([
  "/api/like",
  "/api/stats",
  "/api/contact",
  "/api/observatory-agent",
]);

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
  const pathname = req.nextUrl.pathname;
  const isPdfRoute = pathname === "/pdf" || pathname.startsWith("/pdf/");
  const shouldProtect =
    isAdminRoute(req) ||
    (mode === "private" &&
      !isLoginRoute(req) &&
      !isPdfRoute &&
      !isPublicApiRoute(req));

  if (shouldProtect) {
    await auth.protect();
  }
}, {
  signInUrl: "/login",
  signUpUrl: "/login",
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
