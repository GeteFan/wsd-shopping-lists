import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const deactivateList = async (id) => {
  await sql`UPDATE shopping_lists
    SET active = false WHERE id = ${ id }`;
};

const findAllActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const countAllLists = async () => {
  const number = await sql`SELECT COUNT(*) FROM shopping_lists`;
  if (number[0].count == undefined || number[0].count < 1) {
    return "No shopping lists yet.";
  } else {
    return `Shopping lists: ${number[0].count}`;
  }
}

export { create, deactivateList, findAllActiveLists, countAllLists }; 