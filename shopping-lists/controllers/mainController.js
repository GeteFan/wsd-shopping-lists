import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const viewMain = async (request) => {
    const data = {
      shopping_lists: await listService.countAllLists(),
      list_items: await itemService.countAllItems(),
    };
  
    return new Response(await renderFile("main.eta", data), responseDetails);
};

export { viewMain };