import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return redirectTo("/lists");
};


const viewMain = async (request) => {

  return new Response(await renderFile("main.eta"), responseDetails);
};

const viewLists = async (request) => {
  const data = {
    shopping_lists: await listService.findAllActiveLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

export { addList, viewMain, viewLists };