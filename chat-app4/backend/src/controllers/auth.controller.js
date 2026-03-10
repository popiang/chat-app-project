import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
	try {
		if (password.length < 6) {
			return res.status(400).json({message: "Password must be at least 6 characters"})
		}

		const existingUser = await User.findOne({email});

		if (existingUser) {
			return res.status(400).json({message: "User already exists"});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await User.create({
			fullName,
			email, 
			password: hashedPassword
		});

		if (newUser) {

		}

	} catch (error) {
		console.log("Error in ")
	}
};

export const login = () => {
    res.status(200).json({ message: "Login" });
};

export const logout = () => {
    res.status(200).json({ message: "Logout" });
};
