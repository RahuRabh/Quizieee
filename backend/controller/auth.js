// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const User = require("../models/user");

// //logic for handling registration
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword } = req.body;

//     const isExistingUser = await User.findOne({ email: email });

//     if (isExistingUser) {
//       return res.json({
//         errorMessage: "Email already exists",
//       });
//     }
//     if (password !== confirmPassword) {
//       return res.json({
//         errorMessage: "Passwords do not match",
//       });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const userData = new User({
//       name: name,
//       email: email,
//       password: hashedPassword,
//       confirmPassword: hashedPassword,
//     });

//     await userData.save();
//     res.json({ message: "Registered" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ errorMessage: "Internal Server Error " });
//   }
// };

// //logic for handling login
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userDetails = await User.findOne({ email });
//     if (!userDetails) {
//       return res.json({ errorMessage: "Invalid email" });
//     }
//     const passwordMatch = await bcrypt.compare(password, userDetails.password);
//     if (!passwordMatch) {
//       return res.json({ errorMessage: "Invalid password" });
//     }
//     const token = jwt.sign({ userId: userDetails._id }, process.env.SECRET_KEY);
//     res.cookie("token", token, { httpOnly: true });
//     res.json({
//       message: "Logged",
//       token: token,
//       userId: userDetails._id,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = { registerUser, loginUser };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Logic for handling registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res.json({
        errorMessage: "Email already exists",
      });
    }
    if (password !== confirmPassword) {
      return res.json({
        errorMessage: "Passwords do not match",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new User({
      name: name,
      email: email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    await userData.save();
    res.json({ message: "Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

// Logic for handling login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.json({ errorMessage: "Invalid email" });
    }
    const passwordMatch = await bcrypt.compare(password, userDetails.password);
    if (!passwordMatch) {
      return res.json({ errorMessage: "Invalid password" });
    }
    const token = jwt.sign({ userId: userDetails._id }, process.env.SECRET_KEY);
    res.cookie("token", token, { httpOnly: true });
    res.json({
      message: "Logged",
      token: token,
      userId: userDetails._id,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser };