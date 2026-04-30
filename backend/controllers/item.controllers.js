const mongoose = require("mongoose");

const Item = require("../models/item.model");


exports.createItem = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const item = await Item.create({
      title,
      description,
      status,
      user: req.userId,
    });


    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error creating item: ${error.message}`,
    });
  }
};


exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.userId });

    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found or unauthorized",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.updateItem = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (status) updateFields.status = status;

    const updatedItem = await Item.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found or unauthorized",
      });
    }

    res.json({
      success: true,
      data: updatedItem,
      message: "Item updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found or unauthorized",
      });
    }

    res.json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

