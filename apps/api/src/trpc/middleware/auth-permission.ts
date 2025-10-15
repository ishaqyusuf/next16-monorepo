// import { TRPCError } from "@trpc/server";
import { LRUCache } from "lru-cache";
import type { db } from "@next16/db";
// In-memory cache to check if a user has access to a team
// Note: This cache is per server instance, and we typically run 1 instance per region.
// Otherwise, we would need to share this state with Redis or a similar external store.
const cache = new LRUCache<string, boolean>({
  max: 5_000, // up to 5k entries (adjust based on memory)
  ttl: 1000 * 60 * 30, // 30 minutes in milliseconds
});

export const withAuthPermission = async <TReturn>(opts: {
  ctx: {
    // session?: Session | null;
    db: typeof db;
  };
  next: (opts: {
    ctx: {
      //   session?: Session | null;
      db: typeof db;
      //   teamId: string | null;
    };
  }) => Promise<TReturn>;
}) => {
  const { ctx, next } = opts;
  // opts.ctx.
  //   const userId = ctx.session?.user?.id;

  //   if (!userId) {
  //     throw new TRPCError({
  //       code: "UNAUTHORIZED",
  //       message: "No permission to access this team",
  //     });
  //   }

  //   const result = await ctx.db.query.users.findFirst({
  //     with: {
  //       usersOnTeams: {
  //         columns: {
  //           id: true,
  //           teamId: true,
  //         },
  //       },
  //     },
  //     where: (users, { eq }) => eq(users.id, userId),
  //   });

  //   if (!result) {
  //     throw new TRPCError({
  //       code: "NOT_FOUND",
  //       message: "User not found",
  //     });
  //   }

  //   const teamId = result.teamId;

  //   // If teamId is null, user has no team assigned but this is now allowed
  //   if (teamId !== null) {
  //     const cacheKey = `user:${userId}:team:${teamId}`;
  //     let hasAccess = cache.get(cacheKey);

  //     if (hasAccess === undefined) {
  //       hasAccess = result.usersOnTeams.some(
  //         (membership) => membership.teamId === teamId,
  //       );

  //       cache.set(cacheKey, hasAccess);
  //     }

  //     if (!hasAccess) {
  //       throw new TRPCError({
  //         code: "FORBIDDEN",
  //         message: "No permission to access this team",
  //       });
  //     }
  //   }

  return next({
    ctx: {
      //   session: ctx.session,
      //   teamId,
      db: ctx.db,
    },
  });
};
