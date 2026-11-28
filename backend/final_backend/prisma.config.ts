import { defineConfig,env} from "prisma/config";
// Source - https://stackoverflow.com/a/79805716
// Posted by Amrita Pathak, modified by community. See post 'Timeline' for change history
// Retrieved 2026-11-25, License - CC BY-SA 4.0

import "dotenv/config";

export default defineConfig({
  datasource: {
    url: env("DATABASE_URL"),
  },
});

