const UserModel = require('../models/userModel');
const express = require("express");
const app = express();
const { User } = require("../models/userModel");
const { City , Country } = require("../models/cityModel");
const { sequelize } = require('../dbConnection');
const { QueryTypes } = require("sequelize");
const jwt = require('../services/jwtService');

//const { Pool }  = require('../config/dbConnection');
const { Pool } = require("pg");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.signupUser = async (req, res) => {
	const { userName, userFirstName, userLogin, userPassword, userPhoneNumber } = req.body;
	
	//res.status(400).json({message:userPassword});mnmnmn
	//try {
		/*
		const [results ] = await sequelize.query(
		'insert into Countries("countryId", "countryName", "regionId") values("2", "togo", "1")',
		  {	
			type: QueryTypes.INSERT,
			returning: true, // required to get results
		  }
		);
		*/
		//const query1= `insert into "Countries" ("countryId", "countryName", "regionId") values(2, "togo",1)`;
		//const myuuid = crypto.randomUUID();
		if (userPassword.length < 6) {
			return res.status(400).json({ message: "Password less than 6 characters" })
		}
		const saltRounds = 10;
		const myuuid = crypto.randomBytes(20).toString('hex');//randomBytes(35)vs ? 
		const hash = await bcrypt.hash(userPassword, saltRounds);
		
		const  pool = new Pool({
			user: 'allopromo_user',
			host: 'localhost',
			database: 'allopromo_dbPostGres',
			password: 'Kad@1207',
			port: 5432,
		});
		var ret ='Togo';
		
		const createUser = await pool.query(
		`insert into "AspNetUsers"(
		"Id",
		"firstName",
		"lastName",
		"isAdmin",
		"isMerchant",
		"Type",
		"UserName",
		"NormalizedUserName",
		"Email",
		"NormalizedEmail",
		"EmailConfirmed",
		"PasswordHash",
		"SecurityStamp",
		"ConcurrencyStamp",
		"PhoneNumber",
		"PhoneNumberConfirmed",
		"TwoFactorEnabled",
		"LockoutEnd",
		"LockoutEnabled",
		"AccessFailedCount"
		) 
		values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) returning *`,[myuuid, userFirstName, userFirstName, 0,0,0, userName, userName,userName,userName,0, hash ,"","",userPhoneNumber,0,0,null,0,0]);
		
		
		//const result = await pool.query(
		//'insert into "Countries" ("countryId", "countryName", "regionId") values($1, $2, $3) returning *',[4, "Mali", null]);
		
		/*
		const [results] = sequelize.query(
		'insert into Countries (countryId, countryName, regionId) values($1, $2, $3) returning * ", [1,Togo, 3]'
		)
		.catch(err =>{
			res.status(400).json({ yoomsg: err });
		});
		//await data.save();
		*/ //98 47 70 16 : citoyen modele ---visa schengen  
		
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
	
    const { userName, userPassword } = req.body;
    try 
	{
        if ((!userName) || (!userPassword)) {
            return res.status(400).json({ error: "Invalid nnbn email or password." });
        }
		let hashedPwd = crypto.createHash('md5').update(userPassword).digest('hex');
		
		//const user = await UserModel.findOne({ userName, userPassword }).select("-password");
		const  pool = new Pool({
			user: 'allopromo_user',
			host: 'localhost',
			database: 'allopromo_dbPostGres',
			password: 'Kad@1207',
			port: 5432,
		});
		const userLogin = await pool.query(`SELECT * from "AspNetUsers" where "UserName" =$1 and "PasswordHash"=$2`,[
        userName,
        userPassword
		]);
		// bcrypt.compare(password, user.password).then(function (result)
		
		if(userLogin.rowCount > 0) {
			return res.status(200).json(
            {
                "status": "success",
                "message": "Login successful Jiop",
                "data": {
                    "accessToken": await jwt.generateToken({
                        userId: userName
                    }),
                }
            }
        )
		} else {
			return res.status(401).json({
            "status": "Bad request",
            "message": "Authentication failed",
            "statusCode": 401
			});
		}
    }catch (error){
        console.error("Login error:", error);
        return res.status(500).json({ error: "Failed to log in." });
    }
};

exports.update = async (req, res, next) => {
    const { role, id } = req.body
    // Verifying if role and id is presnt
    if (role && id) {
		// Verifying if the value of role is admin
		if (role === "admin") {
		  await User.findById(id)
		} else {
		  res.status(400).json({
			message: "Role is not admin",
		  })
		}
    } else {
		res.status(400).json({ message: "Role or Id not present" })
    }
}

exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" })
      } else {
        if (decodedToken.role !== "admin") {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          next()
        }
      }
    })
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" })
  }
}

exports.userAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" })
      } else {
        if (decodedToken.role !== "Basic") {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          next()
        }
      }
    })
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" })
  }
}

app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" })
  res.redirect("/")
});


//http://localhost:3000/bookings?driverId=65ca5821fc586669549c1cc8
//http://localhost:3000/bookings/search?origin=Kabatas
// https://medium.com/@diego.coder/orm-in-action-connecting-node-js-to-postgresql-using-sequelize-104c08f1719f
/*

https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
https://www.loginradius.com/blog/engineering/guest-post/nodejs-authentication-guide
https://stackoverflow.com/questions/53206309/going-from-asp-net-web-api-to-node-js-with-express
*/