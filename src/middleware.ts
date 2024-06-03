import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  afterSignInUrl: "/home",
  afterSignUpUrl: "/home",
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
