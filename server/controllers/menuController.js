const jwt = require("jsonwebtoken");
const { Starter } = require("../model/starterModel.js");
const { Beverage } = require("../model/beverageModel.js");
const { MainCourse } = require("../model/mainCourseModel.js");

const handleAddItem = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      tags,
      image,
      ingredients,
      rating,
      isavailable,
      type,
    } = req.body;

    const newItem = {
      name,
      price,
      description,
      tags,
      image,
      ingredients,
      rating,
      isavailable,
    };
    let isSaved;
    if (type === "starter") {
      const newStarter = new Starter(newItem);
      isSaved = await newStarter.save();
    } else if (type === "beverage") {
      const newBeverage = new Beverage(newItem);
      isSaved = await newBeverage.save();
    } else if (type === "maincourse") {
      const newMainCourse = new MainCourse(newItem);
      isSaved = await newMainCourse.save();
    }

    res.status(201).json({
      success: true,
      message: "Item added successfully",
      data: isSaved,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add item" });
    console.log(error);
  }
};

const handleDeleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const itemFind =
      (await Starter.findById(id)) ||
      (await Beverage.findById(id)) ||
      (await MainCourse.findById(id));

    if (!itemFind) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    (await Starter.findByIdAndDelete(id)) ||
      (await Beverage.findByIdAndDelete(id)) ||
      (await MainCourse.findByIdAndDelete(id));

    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting Item", error });
  }
};

const handleUpdateItem = async (req, res) => {
  try {
    const { id, price, rating, isavailable } = req.body;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Id is required" });

    const itemFind =
      (await Starter.findById(id)) ||
      (await Beverage.findById(id)) ||
      (await MainCourse.findById(id));

    if (!itemFind) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    if (!price && !rating)
      return res
        .status(400)
        .json({ success: false, message: "At least one field is required" });

    let updatedFields = {};
    if (price) updatedFields.price = price;
    if (rating) updatedFields.rating = rating;
    updatedFields.isavailable = isavailable;

    const updatedItem =
      (await Starter.findByIdAndUpdate(id, updatedFields, { new: true })) ||
      (await Beverage.findByIdAndDelete(id, updatedFields, { new: true })) ||
      (await MainCourse.findByIdAndDelete(id, updatedFields, { new: true }));

    console.log(updatedItem);

    res.status(200).json({
      success: true,
      message: "Item Updated successfully",
      updatedItem,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating Item", error });
  }
};

const handlePostMenuStarterForm = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      tags,
      image,
      ingredients,
      rating,
      isavailable,
    } = req.body;
    const newStarter = new Starter({
      name,
      price,
      description,
      tags,
      image,
      ingredients,
      rating,
      isavailable,
    });
    const isSaved = await newStarter.save();
    res
      .status(201)
      .json({ message: "Starter added successfully", data: isSaved });
  } catch (error) {
    res.status(500).json({ message: "Failed to add starter" });
    console.log(error);
  }
};

const handlePostMenuBeverageForm = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      tags,
      image,
      ingredients,
      rating,
      isavailable,
    } = req.body;
    const newBeverage = new Beverage({
      name,
      price,
      description,
      tags,
      image,
      ingredients,
      rating,
      isavailable,
    });
    const isSaved = await newBeverage.save();
    res
      .status(201)
      .json({ message: "Beverage added successfully", data: isSaved });
  } catch (error) {
    res.status(500).json({ message: "Failed to add beverage" });
    console.log(error);
  }
};
const handlePostMenuMainCourseForm = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      tags,
      image,
      ingredients,
      rating,
      isavailable,
    } = req.body;
    const newMainCourse = new MainCourse({
      name,
      price,
      description,
      tags,
      image,
      ingredients,
      rating,
      isavailable,
    });
    const isSaved = await newMainCourse.save();
    res
      .status(201)
      .json({ message: "Main Course added successfully", data: isSaved });
  } catch (error) {
    res.status(500).json({ message: "Failed to add main course" });
    console.log(error);
  }
};

const handleGetStarters = async (req, res) => {
  try {
    const starters = await Starter.find();
    const filteredStarters = starters.filter((starter) => starter.isavailable);
    res.status(200).json({
      success: true,
      message: "Starters fetched successfully",
      data: filteredStarters,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch starters" });
    console.log(error);
  }
};

const handleGetBeverages = async (req, res) => {
  try {
    const beverages = await Beverage.find();
    const filteredBeverages = beverages.filter(
      (beverage) => beverage.isavailable
    );
    res.status(200).json({
      success: true,
      message: "Beverages fetched successfully",
      data: filteredBeverages,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch Beverages" });
    console.log(error);
  }
};

const handleGetMainCourse = async (req, res) => {
  try {
    const mainCourse = await MainCourse.find();
    const filteredMainCourse = mainCourse.filter(
      (mainCourse) => mainCourse.isavailable
    );
    res.status(200).json({
      success: true,
      message: "mainCourse fetched successfully",
      data: filteredMainCourse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch mainCourse" });
    console.log(error);
  }
};

module.exports = {
  handleGetBeverages,
  handleGetMainCourse,
  handleGetStarters,
  handlePostMenuBeverageForm,
  handlePostMenuMainCourseForm,
  handlePostMenuStarterForm,
  handleAddItem,
  handleDeleteItem,
  handleUpdateItem,
};
