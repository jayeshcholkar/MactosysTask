const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const userSignup = async (req, res) => {
  const userData = new userSchema(req.body);
  console.log(req.body)
  try {
    const isUserExist = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExist) {
      req.file ? fs.unlinkSync(req.file.path) : null;
      res.status(409).json({
        success: true,
        messsage: "User is already registered with this email",
      });
    } else {
      if (req.file !== undefined) {
        userData.profilePic = `${req.file.path}`;
      }
      userData.userPassword = await bcrypt.hash(req.body.userPassword, 10);
      await userData.save();
      res.status(201).json({
        success: true,
        messsage: "User registered successfully",
        data: userData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: `Error occur ${error.message}`,
    });
  }
};

const userLogin = async (req, res) => {
  const userData = await userSchema.findOne({ userEmail: req.body.userEmail });
  try {
    if (userData) {
      const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        res.status(200).json({
          success: true,
          message: "User login successfully",
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User is not registered with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.stack}`,
    });
  }
};

module.exports = { userLogin, userSignup };
