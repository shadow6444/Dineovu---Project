const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel.js");

const jwt_secret_key = "859215";

const handlePostUserSignup = async (req, res) => {
  try {
    const { name, email, password, picURL } = req.body;
    const validEmail = await User.findOne({ email });
    if (validEmail)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      picURL: picURL ? picURL : "none",
    });
    const savedUser = await user.save();
    if (!savedUser)
      return console.log({ success: false, message: "Failed to save user" });
    else
      return res
        .status(201)
        .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    const errMsg = {
      success: false,
      message: "Error occurred while processing the request",
      error: error.message,
    };
    console.log(errMsg);
  }
};

const handlePostUserLogin = async (req, res) => {
  try {
    const { email, password, picURL = "none" } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User with these credentials not exist",
      });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    let updatedUser;
    if (user.picURL === "none") {
      updatedUser = await User.findByIdAndUpdate(
        user._id,
        { picURL },
        { new: true }
      );
    } else if (
      user.picURL !== "none" &&
      user.picURL.includes("lh3.googleusercontent")
    ) {
      updatedUser = await User.findByIdAndUpdate(
        user._id,
        { picURL: picURL },
        { new: true }
      );
    } else if (
      user.picURL !== "none" &&
      !user.picURL.includes("lh3.googleusercontent")
    ) {
      updatedUser = user;
    }
    const payload = {
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      picURL: updatedUser.picURL,
    };
    const token = jwt.sign(payload, jwt_secret_key, { expiresIn: "24h" });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    const errMsg = {
      success: false,
      message: "Error occurred while processing the request",
      error: error.message,
    };
    res.status(500).json(errMsg);
    console.log(errMsg);
  }
};

const handleGetUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User with this email doesn't exist. Please Signup",
      });
    res.status(200).json({
      success: true,
      message: "User found successfully",
    });
  } catch (error) {
    const errMsg = {
      success: false,
      message: "Error occurred while processing the request",
      error: error.message,
    };
    console.log(errMsg);
  }
};

const handlePutUpdateUser = async (req, res) => {
  try {
    const { name, currentPassword, newPassword } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization token is missing" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, jwt_secret_key);
    } catch (error) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token" });
    }
    const userFind = await User.findOne({ email: decodedToken.email });

    if (!userFind)
      return res.status(404).json({
        success: false,
        message: "User doesnot exist. Please Signup",
      });

    if (currentPassword) {
      const isMatched = bcrypt.compareSync(currentPassword, userFind.password);
      if (!isMatched)
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
    }

    let updatedFields = {};

    if (name) updatedFields.name = name;

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updatedFields.password = hashedPassword;
    }

    if (req.file) {
      updatedFields.picURL =
        `http://localhost:3000/uploads/${req.file.filename}`.replaceAll(
          " ",
          "%20"
        );
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: userFind.email },
      updatedFields,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "User Updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while processing the request",
      error: error.message,
    });
  }
};

module.exports = {
  handlePostUserSignup,
  handlePostUserLogin,
  handleGetUser,
  handlePutUpdateUser,
};
