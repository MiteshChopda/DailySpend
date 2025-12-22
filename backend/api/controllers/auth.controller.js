import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists)
        return res.status(409).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
        return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
        return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email }
    });
};
