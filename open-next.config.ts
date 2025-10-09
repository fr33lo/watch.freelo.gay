// OpenNext Cloudflare config
// For initial deploys, use a dummy incremental cache to avoid requiring R2 right away.
// You can switch to the R2-backed cache later for production by setting
//   incrementalCache: r2IncrementalCache
// and adding the R2 binding in wrangler.toml.
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

export default defineCloudflareConfig({
  incrementalCache: "dummy",
});
