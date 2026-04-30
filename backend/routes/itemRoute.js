// routes/itemRoutes.js
const express = require("express");
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
} = require("../controllers/item.controllers");
const isAuth = require("../middleware/isAuth");

const itemRouter = express.Router();


itemRouter.post("/add-items", isAuth, createItem);
itemRouter.get("/all-items", isAuth, getAllItems);
itemRouter.get("/get-by-id/:id", isAuth, getItemById);
itemRouter.put("/edit-items/:id", isAuth, updateItem);
itemRouter.delete("/item-by-id/:id", isAuth, deleteItem);

module.exports = itemRouter;
