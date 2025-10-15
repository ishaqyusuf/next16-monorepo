import type { Database } from "@next16/db";

export type Context = {
  Variables: {
    db: Database;
    // session: Session;
    // teamId: string;
  };
};
