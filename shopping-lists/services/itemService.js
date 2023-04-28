import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_list_items (name) VALUES (${ name })`;
};

const findAllNonCollected = async () => {
    return await sql`SELECT * FROM shopping_list_items WHERE collected = false`;
};

const collectItem = async (id) => {
    await sql`UPDATE shopping_list_items
      SET collected = true WHERE id = ${ id }`;
  };

export { create, findAllNonCollected, collectItem };
