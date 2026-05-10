import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { get } from "@vercel/edge-config";

type SiteAccessMode = "public" | "private";
type SessionClaimsWithRole = {
  metadata?: { role?: string };
  publicMetadata?: { role?: string };
  public_metadata?: { role?: string };
};

const isAdminRoute = createRouteMatcher(["/admin(.*)", "/studio(.*)"]);
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
    const session = await auth.protect();
    const claims = session.sessionClaims as SessionClaimsWithRole;
    const role = claims.metadata?.role ?? claims.publicMetadata?.role ?? claims.public_metadata?.role;

    if (isAdminRoute(req) && role !== "admin") {
      return Response.redirect(new URL("/", req.url));
    }
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
