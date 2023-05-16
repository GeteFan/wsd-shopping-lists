import { executeQuery } from "../database/database.js";

const create = async (name) => {
  await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name);",
  {name: name},
  );
};

const deactivateList = async (id) => {
  await executeQuery("UPDATE shopping_lists SET active = false WHERE id = $id;",
  {id: id},
  );
};

const findAllActiveLists = async () => {
  return await executeQuery("SELECT * FROM shopping_lists WHERE active = true;");
};

const countAllLists = async () => {
  const number = await executeQuery("SELECT COUNT(*) FROM shopping_lists;");
  console.log(number.rows);
  if (number.rows[0].count == undefined || number.rows[0].count < 1) {
    return "No shopping lists yet.";
  } else {
    return `Shopping lists: ${number[0].count}`;
  }
}

export { create, deactivateList, findAllActiveLists, countAllLists }; 