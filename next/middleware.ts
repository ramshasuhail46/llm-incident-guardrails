import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/", "/api/webhooks(.*)", "/docs(.*)", "/product(.*)", "/pricing(.*)", "/solutions(.*)"]);

export default clerkMiddleware(async (auth, request) => {
    const { searchParams } = new URL(request.url);
    const isDemo = searchParams.get('demo') === 'true';

    if (!isPublicRoute(request) && !isDemo) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
