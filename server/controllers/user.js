import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { userId, userPassword } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({ error: "Invalid user ID or Password" });
    }

    const validPassword = await bcrypt.compare(userPassword, user.userPassword);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid user ID or Password" });
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
};

export const registerUser = async (req, res) => {
  const {
    userId,
    userPassword,
    userName,
    userPosition,
    userPhone,
    userEmail,
    userAddress,
    userRole,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const newUser = new User({
      userId,
      userPassword: hashedPassword,
      userName,
      userPosition,
      userPhone,
      userEmail,
      userAddress,
      userRole,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const newUser = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
};
