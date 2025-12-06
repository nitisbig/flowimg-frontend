
import { integer, pgTable, varchar, boolean } from "drizzle-orm/pg-core";

export const apiKeyTable = pgTable("api_key", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  token: varchar({ length: 255 }).notNull().unique(),
  isActive: boolean("is_active").default(true),
});
