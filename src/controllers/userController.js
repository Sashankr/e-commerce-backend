const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password: currentPassword } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(401).json("Wrong Credentials");
    }
    const userPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (userPassword !== currentPassword) {
      res.status(401).json("Wrong Credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    // res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    console.log(req.params);
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    console.log(others);

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
