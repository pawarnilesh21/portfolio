import raw from "./portfolio.json";
import { portfolioSchema } from "./schema";

// Build tooling validates the same schema; UI integration starts after plan approval.
export const portfolio = portfolioSchema.parse(raw);
export type { Portfolio, Project, Role } from "./schema";
