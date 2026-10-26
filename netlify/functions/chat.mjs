import { handleChat } from "../../server/chat.mjs";
export default async function chat(request, context) {
  return handleChat(request, {
    ip: context.ip || "unknown",
    onMetrics: (metrics) =>
      console.info(JSON.stringify({ event: "portfolio-chat", ...metrics })),
  });
}
export const config = {
  path: "/api/chat",
  rateLimit: { windowLimit: 12, windowSize: 60, aggregateBy: ["ip"] },
};
