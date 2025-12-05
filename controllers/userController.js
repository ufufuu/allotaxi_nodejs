const UserModel = require('../models/userModel');
const express = require("express");
const app = express();
const { User } = require("../models/userModel");
const { City , Country } = require("../models/cityModel");
const { QueryTypes } = require("sequelize");
const jwt = require('../services/jwtService');
const { pool, sequelize }  = require('../config/db');

//const { Pool } = require("pg");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

exports.signupUser = async (req, res) => {
	const { userName, userFirstName, userLastName, userLogin, userPassword, userPhoneNumber } = req.body;
	
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
		if (userPassword.length < 6) {
			return res.status(400).json({ message: "Password less than 6 characters" })
		}
		const saltRounds = 10;
		const uId = crypto.randomBytes(20).toString('hex');
		const hashedPwd = await bcrypt.hash(userPassword, saltRounds);	
		
		const createUser = await pool.query(
		`insert into "AspNetUsers"(
		
		"Id",
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
		"AccessFailedCount",
		
		"Discriminator",
		"firstName",
		"lastName",
		"middleName",
		"isAdmin",
		"isDriver") 
		values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) returning $1, $2`,
		[uId, userName, "USERNAME10", userName, "USERNAME10", false, hashedPwd ,"securityStamp", "concurrrencyStamp", userPhoneNumber, false, false, null, false, 0,  "discriminator", userFirstName, "lastName", "middleName", false,false ]);
		
		res.status(201).json(createUser);
		//res.status(201).json(createUser["userName"]);
		res.status(201).json(userName);
		
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

		/*
		const  pool = new Pool({
			user: 'allopromo_user',
			host: 'localhost',
			database: 'allopromo_dbPostGres',
			password: 'Kad@1207',
			port: 5432,
		});
		*/
		
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

// https://www.geeksforgeeks.org/sql/how-to-design-a-database-for-ride-sharing-and-carpooling-services/

//http://localhost:3000/bookings?driverId=65ca5821fc586669549c1cc8
//http://localhost:3000/bookings/search?origin=Kabatas
// https://medium.com/@diego.coder/orm-in-action-connecting-node-js-to-postgresql-using-sequelize-104c08f1719f
/*

https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2
https://www.loginradius.com/blog/engineering/guest-post/nodejs-authentication-guide
https://stackoverflow.com/questions/53206309/going-from-asp-net-web-api-to-node-js-with-express

https://www.w3schools.com/nodejs/nodejs_api_auth.asp

https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2

https://www.apurple.co/ride-sharing-app-development/


https://stackoverflow.com/questions/34997598/sql-database-ride-sharing

Ride Match : https://medium.com/@deepdeepak2222/how-to-implement-a-ride-matching-system-using-postgres-postgis-and-python-93cdcc5d0d55
*/
// https://dev.to/biswasprasana001/designing-a-ride-hailing-service-system-eg-uberlyft-a-beginner-friendly-guide-252o

//-- https://github.com/richxcame/ride-hailing


// -- https://www.alibabacloud.com/blog/database-design-and-implementation-of-a-ride-hailing-dispatch-system_597161
/*
1
docker run — name loc_psql -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=mydb -p 5434:5432 -d postgis/postgis
2.
docker exec -it loc_psql bash. loc_psql

*/

/*
driver rider matching Engine in Javascript + map + github
*/