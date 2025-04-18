import bcrypt from 'bcryptjs'
import User from "../models/userModel.js";
import cloudinary from '../lib/cloudinary.js'
import { generateToken } from '../lib/utils.js';

export const signup = async (req, res) => {
    
    const {fullName, email, password} = req.body
    try {
        // hash passwords
        if(!fullName || !email || !password){
           return res.status(400).json({message: "Kindly fill all details"});
        }
        
        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 characters"});
        }

        const user = await User.findOne({email});

        if(user) res.status(400).json({message: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            // generate jwt token
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })

        }else{
            res.status(400).json({message:"Invalid user credentials"})
        }

    } catch (error) {
        console.error("Error in SignUp Controller", error.message);
        res.status(500).json({message:"Internal server error"})
    }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
       try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logged out sucessfully"})
       } catch (error) {
         console.log("Error in logout controller", error.message);
         res.status(500).json({message:"Internal server error"})
       }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required!" });
        }

        // ✅ Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "chat-app", // Organize inside a folder (optional)
            transformation: [{ width: 300, height: 300, crop: "limit" }] // Limit size
        });

        // ✅ Update User Profile Pic in Database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in check authController", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}
