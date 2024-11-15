import { createRouteHandler } from "uploadthing/next";
import { psicobookingFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: psicobookingFileRouter,
  // Apply an (optional) custom config:
  // config: { ... },
});
