import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { buildAvatarUrl, withProfileFallback } from "../utils/avatar.js";
import { io } from "../socket/socket.js";

export const register = async(req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists, try different" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: buildAvatarUrl(fullName || username),
            gender,
        });
        const safeUser = withProfileFallback(user);

        io.emit("userRegistered", {
            _id: safeUser._id,
            username: safeUser.username,
            fullName: safeUser.fullName,
            profilePhoto: safeUser.profilePhoto,
            gender: safeUser.gender,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
            user: safeUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const login = async(req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Incorrect username or password", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect username or password", success: false });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        const safeUser = withProfileFallback(user);

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "None",
                secure: true,
            })
            .json({
                _id: safeUser._id,
                username: safeUser.username,
                fullName: safeUser.fullName,
                profilePhoto: safeUser.profilePhoto,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const logout = (req, res) => {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
        message: "Logged out successfully.",
    });
};

export const getOtherUsers = async(req, res) => {
    try {
        const loggedInUserId = req.id;
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(users.map(withProfileFallback));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};