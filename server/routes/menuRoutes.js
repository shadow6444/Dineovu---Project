// Import required modules
const express = require("express");
const menuRouter = express.Router();

// Import booking controller
const {
  handleGetBeverages,
  handleGetMainCourse,
  handleGetStarters,
  handlePostMenuBeverageForm,
  handlePostMenuMainCourseForm,
  handlePostMenuStarterForm,
  handleAddItem,
  handleDeleteItem,
  handleUpdateItem,
} = require("../controllers/menuController.js");

// booking routes
menuRouter.post("/starter", handlePostMenuStarterForm);
menuRouter.post("/beverage", handlePostMenuBeverageForm);
menuRouter.post("/maincourse", handlePostMenuMainCourseForm);
menuRouter.get("/starter", handleGetStarters);
menuRouter.get("/beverage", handleGetBeverages);
menuRouter.get("/maincourse", handleGetMainCourse);
menuRouter.post("/add", handleAddItem);
menuRouter.put("/update", handleUpdateItem);
menuRouter.delete("/:id", handleDeleteItem);

module.exports = { menuRouter };
