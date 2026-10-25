import { handleChat } from "../../server/chat.mjs";
export default async function chat(request, context) {
  return handleChat(request, { ip: context.ip || "unknown" });
}
export const config = {
  path: "/api/chat",
  rateLimit: { windowLimit: 12, windowSize: 60, aggregateBy: ["ip"] },
};
