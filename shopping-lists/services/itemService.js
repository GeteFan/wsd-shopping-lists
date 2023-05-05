import { sql } from "../database/database.js";

const create = async (name, shoppingListId) => {
  await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${ name }, ${ shoppingListId })`;
};

const findAllItems = async (shoppingListId) => {
    const notCollected = await sql`SELECT * FROM shopping_list_items WHERE collected = false AND shopping_list_id = ${shoppingListId} ORDER BY name ASC`;
    const collected = await sql`SELECT * FROM shopping_list_items WHERE collected = true AND shopping_list_id = ${shoppingListId} ORDER BY name ASC`;
    return { listId: shoppingListId, nonCollected: notCollected, collected: collected };
};

const countAllItems = async () => {
    const number = await sql`SELECT COUNT(*) FROM shopping_list_items`;
    const count = number.rowsOfObjects()[0].count;
    return number;
}

const collectItem = async (id) => {
    await sql`UPDATE shopping_list_items
      SET collected = true WHERE id = ${ id }`;
};

export { create, collectItem, findAllItems, countAllItems };
