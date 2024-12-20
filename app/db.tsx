import * as schema from "@/app/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { getUser, getAccessTokenAsync } from "@propelauth/nextjs/server/app-router";

export async function fetchWithDrizzle<T>(
  callback: (
    db: NeonHttpDatabase<typeof schema>,
    { userId, authToken }: { userId: string; authToken: string },
  ) => Promise<T>,
) {
  const user = await getUser();
  if (!user) {
    throw new Error("No user");
  }

  const accessToken = await getAccessTokenAsync();
  if (!accessToken) {
    throw new Error("No access token");
  }
  const db = drizzle(
    neon(process.env.DATABASE_AUTHENTICATED_URL!, {
      authToken: async () => {
        const accessToken = await getAccessTokenAsync();
        if (!accessToken) {
          throw new Error("No access token");
        }
        return accessToken;
      },
    }),
    { schema },
  );

  return callback(db, {
    userId: user.userId,
    authToken: accessToken,
  });
}
