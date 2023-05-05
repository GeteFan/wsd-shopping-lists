import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const listId = urlParts[2];

    const formData = await request.formData();
    const name = formData.get("name");
    
    await itemService.create(name, listId);
  
    return requestUtils.redirectTo(`/lists/${ listId }`);
};

const collectItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const listId = urlParts[2];
    const itemId = urlParts[3];

    await itemService.collectItem(itemId);
  
    return requestUtils.redirectTo(`/lists/${ listId }`);
};

const viewListItems = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const listId = urlParts[2];

    const data = {
        list_items: await itemService.findAllItems(listId),
    };
  
    return new Response(await renderFile("list.eta", data), responseDetails);
};

export { addItem, collectItem, viewListItems };