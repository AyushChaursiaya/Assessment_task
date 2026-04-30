const bcrypt = require("bcryptjs");
const User = require("./../models/user.model");
const genToken = require("../utils/token");

exports.signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already exist." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    }

    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "Mobile must be at least 10 Digits." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

    const token = await genToken(newUser._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({
      message: "User SignUp Successfully.",
      newUser,
    });
  } catch (error) {
    return res.status(500).json(`SignUp failed Error: ${error}`);
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      message: "User LogIn Successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json(`LogIn failed ${error}`);
  }
};

exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "LogOut Successfully." });
  } catch (error) {
    return res.status(500).json({ message: `LogOut failed. ${error}` });
  }
};
