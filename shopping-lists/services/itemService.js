import { sql } from "../database/database.js";

const create = async (name, shoppingListId) => {
  await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${ name }, ${ shoppingListId })`;
};

const findAllItems = async (shoppingListId) => {
    const mainListId = shoppingListId;
    const notCollected = await sql`SELECT * FROM shopping_list_items WHERE collected = false AND shopping_list_id = ${shoppingListId} ORDER BY name ASC`;
    const collected = await sql`SELECT * FROM shopping_list_items WHERE collected = true AND shopping_list_id = ${shoppingListId} ORDER BY name ASC`;
    return { listId: mainListId, nonCollected: notCollected, collected: collected };
};

const collectItem = async (id) => {
    await sql`UPDATE shopping_list_items
      SET collected = true WHERE id = ${ id }`;
  };

export { create, findAllItems, collectItem };
