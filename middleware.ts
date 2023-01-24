import { NextRequest, NextResponse } from "next/server";

const SSG_ROUTES = ["/"];

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/?((?!api/|_next/|_static/|public/|images/|sw.js|[\\w-]+\\.\\w+).*)",
    ...SSG_ROUTES,
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers.get("host");

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const pathname = url.pathname;

  /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
      still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard. */
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname
          // Custom Domain
          ?.replace(`.o-hi-o-official.store`, "")
          // Production Vercel Domain
          ?.replace(`.o-hi-o-official.vercel.app`, "")
          // Stage Vercel Domain
          ?.replace(`.o-hi-o-official-stage.vercel.app`, "")
      : hostname?.replace(`.localhost:3000`, "");

  console.log(currentHost, "currentHost");

  // Only rewrite when subdomain is found & matches SSG routes to `/_sites/[site] dynamic route
  if (SSG_ROUTES.includes(pathname) && currentHost !== "localhost:3000") {
    return NextResponse.rewrite(
      new URL(`/_sites/${currentHost}${pathname}`, req.url)
    );
  }

  // rest routes will return default
}
