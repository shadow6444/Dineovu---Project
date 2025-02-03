const jwt = require("jsonwebtoken");
const { Starter } = require("../model/starterModel.js");
const { Beverage } = require("../model/beverageModel.js");
const { MainCourse } = require("../model/mainCourseModel.js");

const jwt_secret_key = "859215";

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
    res
      .status(200)
      .json({ message: "Starters fetched successfully", data: starters });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch starters" });
    console.log(error);
  }
};

const handleGetBeverages = async (req, res) => {
  try {
    const beverages = await Beverage.find();
    res
      .status(200)
      .json({ message: "Beverages fetched successfully", data: beverages });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Beverages" });
    console.log(error);
  }
};

const handleGetMainCourse = async (req, res) => {
  try {
    const mainCourse = await MainCourse.find();
    res
      .status(200)
      .json({ message: "mainCourse fetched successfully", data: mainCourse });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mainCourse" });
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
};
