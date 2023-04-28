import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const formData = await request.formData();
    const name = formData.get("name");
  
    await itemService.create(name, urlParts[2]);
  
    return requestUtils.redirectTo("/lists");
};

const viewLists = async (request) => {
    const data = {
      shopping_lists: await listService.findAllActiveLists(),
    };
  
    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewListItems = async (request) => {
    const data = {
        list_items: await itemService.findAllNonCollected(),
    };
  
    return new Response(await renderFile("list.eta", data), responseDetails);
};

export { addItem, viewLists, viewListItems };