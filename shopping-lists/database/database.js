import { postgres } from "../deps.js";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";


const DATABASE_URL = "postgres://roman_moroz_wsd_shopping_lists_oaks_user:yH4DLmv88d2FwU7lpJpIuJogtBhCXzpL@dpg-cis1kgtph6et1scsmsf0-a.frankfurt-postgres.render.com/roman_moroz_wsd_shopping_lists_oaks";

const CONCURRENT_CONNECTIONS = 3;
const connectionPool = new Pool(DATABASE_URL, CONCURRENT_CONNECTIONS);


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
