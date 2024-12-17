import { createClient } from "@libsql/client";
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from "@/lib/env";

export const turso = createClient({
  url: TURSO_DATABASE_URL!,
  authToken: TURSO_AUTH_TOKEN!,
});
