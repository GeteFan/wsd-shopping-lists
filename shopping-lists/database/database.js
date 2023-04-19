import { postgres } from "../deps.js";

import { Client } from "https://deno.land/x/postgres/mod.ts";

const client = new Client({
  user: "username",
  database: "database",
  password: "password",
  hostname: "database-p1-3669f4dc-5e14-4733-8b72-2d59122fe97a",
  port: 5432, // default PostgreSQL port
  tls: {
    enforce: true, // enable SSL/TLS
  },
});

await client.connect();
// let sql;
// if (Deno.env.get("DATABASE_URL")) {
//   sql = postgres(Deno.env.get("DATABASE_URL"));
// } else {
//   sql = postgres({});
// }

export { sql };