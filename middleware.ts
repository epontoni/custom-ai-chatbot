import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// "/admin(.*)"
const isProtectedRoute = createRouteMatcher([
  "/create-chatbot(.*)",
  "/edit-chatbot(.*)",
  "/review-sessions(.*)",
  "/view-chatbots(.*)",
]);

export default clerkMiddleware(
  (auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  },
  { signInUrl: "/login", signUpUrl: "/login" }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
