// Builds the static review site into ./out for https://pixelstreet.host/l/ (all versions + review index).
// Usage: npm run export            → base path /l
//        npm run export -- /other  → custom base path
// Upload the *contents* of ./out into the /l/ folder on the server.
import { spawnSync } from "node:child_process";

const basePath = process.argv[2] ?? "/l";
const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, MORUCHA_EXPORT: "1", MORUCHA_BASE_PATH: basePath },
});
process.exit(result.status ?? 1);
