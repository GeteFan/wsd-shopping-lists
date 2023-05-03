import { sql } from "../database/database.js";

const create = async (name, shoppingListId) => {
  await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${ name }, ${ shoppingListId })`;
};

const findAllNonCollected = async (shoppingListId) => {
    id = shoppingListId;
    notCollected = await sql`SELECT * FROM shopping_list_items WHERE collected = false AND shopping_list_id = ${shoppingListId} `;
    return { listId: id, nonCollected: notCollected };
};

const collectItem = async (id) => {
    await sql`UPDATE shopping_list_items
      SET collected = true WHERE id = ${ id }`;
  };

export { create, findAllNonCollected, collectItem };
