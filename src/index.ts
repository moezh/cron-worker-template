import { runWorker } from "./worker";
import { Env } from "./types";

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runWorker(env));
  },

  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    const result = await env.db
      .prepare("SELECT DATETIME('now', 'localtime') as db")
      .first();
    return new Response(
      JSON.stringify({
        message: "This worker runs on a schedule.",
        result,
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  },
};
