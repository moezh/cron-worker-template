import { Env } from "./types";

export async function runWorker(env: Env) {
  console.log("> runWorker: ", new Date().toISOString());
  await env.db
    .prepare("INSERT INTO jobs(name, status) VALUES ('cron-1', 'done')")
    .run();
}
