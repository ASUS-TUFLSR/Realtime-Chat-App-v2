import bcrypt from 'bcryptjs'
import User from "../models/userModel.js";
import { generateToken } from '../lib/utils.js';

export const signup = async (req, res) => {
    
    const {fullName, email, password} = req.body
    try {
        // hash passwords
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
        console.log("Error in SignUp Controller", error.message);
        res.status(500).json({message:"Internal server error"})
    }
}

export const login = (req, res) => {
    res.send("login Route");
}
export const logout = (req, res) => {
    res.send("logout Route");
}