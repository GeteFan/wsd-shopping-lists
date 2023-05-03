import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const deactivateList = async (id) => {
  await sql`UPDATE shopping_lists
    SET active = false WHERE id = ${ id }`;
};

export { create, findAllActiveLists, deactivateList };