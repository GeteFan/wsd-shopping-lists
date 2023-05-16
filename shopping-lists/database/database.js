import { postgres } from "../deps.js";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

Deno.env.set("DATABASE_URL", "postgres://roman_moroz_wsd_shopping_lists_user:t8ZYqT9dsf76hHt9Ek9p80MzXhZaqcWV@dpg-cgvsskpeuhlhlbhpjp70-a/roman_moroz_wsd_shopping_lists");

const env = postgres(Deno.env.get("DATABASE_URL"));

const databaseCredentials = async (env) => {
  let sql;
  if (env) {
    sql = env;
  } else {
    console.log("not adfaf");
    sql = {};
  }
  return sql;
};


const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool(databaseCredentials(env), CONCURRENT_CONNECTIONS);

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
