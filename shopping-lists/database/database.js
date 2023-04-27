import { postgres } from "../deps.js";

Deno.env.set("DATABASE_URL", "postgres://roman_moroz_wsd_shopping_lists_user:t8ZYqT9dsf76hHt9Ek9p80MzXhZaqcWV@dpg-cgvsskpeuhlhlbhpjp70-a/roman_moroz_wsd_shopping_lists");
let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
  await sql`INSERT INTO shopping-lists (name) VALUES ("name")`;
  console.log(await sql`SELECT * FROM shopping_lists WHERE active = true`);
} else {
  console.log("not adfaf");
  sql = postgres({});
}

export { sql };