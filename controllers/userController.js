const UserModel = require('../models/userModel');
const express = require("express");
const app = express();

exports.signupUser = async ( req, res ) => {
	
	//const { userName, userPassword } = req.body;
	
	res.send("from User Controller");
	
	/*try {
        const userExists = await UserModel.findOne({ email });
        if (userExists) return res.status(400).json({ message: " User already exists " });

        const user = new User({ name, email, password, role: "admin" });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: "Failed to register user" });
    }*/
	
	
	//try 
	//{
		//console.log(" user Name:", JSON .stringify(app));
		
		//res.send("from User Controller");
		
        //const userExists = await UserModel.findOne({ email });
        //if (userExists) return res.status(400).json({ message: " User already exists " });
        //const user = new User({ name, email, password, role: "client" });
		
        //const savedUser = await user.save();
		
		/*
		const user = await userService.createUser(
			fullname.firstname,
			fullname.lastname,
			email,
			password,
			phone
		);*
        res.status(201).json(savedUser);
		*/
   // } catch (error) {
     //   res.status(400).json({ message: "Failed to register user" });
    //}
};

exports.loginUser = async(req, res) => {
    const { email, password } = req.body;
    try 
	{
        const user = await UserModel.findOne({ email, password }).select("-password");
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password." });
        }
        req.session.user = {
            id: user._id.toString(),
            email: user.email,
            stripeAccountId: user.stripeAccountId || null,
        };

        return res.status(200).json({
            message: "Login successful",
            user: user
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Failed to log in." });
    }
};


//http://localhost:3000/bookings?driverId=65ca5821fc586669549c1cc8
//http://localhost:3000/bookings/search?origin=Kabatas

// https://medium.com/@diego.coder/orm-in-action-connecting-node-js-to-postgresql-using-sequelize-104c08f1719f