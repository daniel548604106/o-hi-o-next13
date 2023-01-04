import type { NextApiRequest, NextApiResponse } from "next";

type Data = string | Record<string, string | string[] | any>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Check for secret to confirm this is a valid request
  //   if (req.query.secret !== process.env.REVALIDATE_SECRET) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }

  const pageToRevalidate = req.query.page;

  if (!pageToRevalidate)
    return res.status(403).json({
      message: `No page to revalidate, please specify ,the current requested page is ${pageToRevalidate}`,
    });

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(pageToRevalidate as string);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
