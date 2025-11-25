const UserModel = require('../models/userModel');
const express = require("express");
const app = express();
const { User } = require("../models/userModel");
const { City , Country } = require("../models/cityModel");
const { sequelize } = require('../dbConnection');
const { QueryTypes } = require("sequelize");

//const { Pool }  = require('../config/dbConnection');

const { Pool } = require("pg");

exports.signupUser = async (req, res) => {
	const { userName, userPassword } = req.body;
	
	//res.status(400).json({message:userPassword});mnmnmn
	
	//try {
		
		/*
		const [results ] = await sequelize.query(
		'insert into Countries("countryId", "countryName", "regionId") values("2", "togo", "1")',
		  {	
			type: QueryTypes.INSERT,
			returning: true, // required to get results
		  }
		);*/
		//const query1= `insert into "Countries" ("countryId", "countryName", "regionId") values(2, "togo",1)`;
		
		const  pool = new Pool({
			user: 'allopromo_user',
			host: 'localhost',
			database: 'allopromo_dbPostGres',
			password: 'Kad@1207',
			port: 5432,
		});
		var ret ='Togo';
		const result = await pool.query(
		'insert into "Countries" ("countryId", "countryName", "regionId") values($1, $2, $3) returning *',[4, "Mali", null])
		
		
		
		/*
		
		const data = sequelize.query(
		'insert into Countries (countryId, countryName, regionId) values($1, $2, $3) returning * ", [1,Togo, 3]'
		)
		.catch(err =>{
			res.status(400).json({ yoomsg: err });
		});
		//await data.save();
		*/
		
		/*
		const id=2;
		const name="Dapaong";
		const country=1;
		const region =null;
		
		const data = await Country.create({
			Id: "2",
			Name: "name",
			Region: "1"
		});*/
		//await data.save();
	
        //res.status(201).json(data);
		
    //} catch (error) {
      //res.status(400).json({ message: "Failed to register user" });
	  //res.send(error);
    //}
	
	
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