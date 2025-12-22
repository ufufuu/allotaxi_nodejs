const crypto = require("crypto");
const { QueryTypes } = require("sequelize");
const userModel = require("../models/userModel");
const jwt = require('../services/jwtService');
const { pool, sequelize }  = require('../config/db');

//const bcrypt = require("bcrypt");

module.exports.createUser = async ( firstname, lastname, email, password, phone ) => {

	const _query =`insert into "AspNetUsers"(
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
		values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) returning $1, $2`;
	const createUser = await pool.query(_query, [uId, userName, "KEV21@ALLO.CC", userName, "KEV21@ALLO.CC", false, hashedPwd ,"securityStamp", "concurrrencyStamp", userPhoneNumber, false, false, null, false, 0,  "discriminator", userFirstName, "lastName", "middleName", false,false ]);

	/*
	const user = await userModel.create({
		fullname: {
		  firstname,
		  lastname,
		},
		email,
		password: hashedPassword,
		phone,
	});
	return user;*/

};

module.exports.loginUser = async ( userName, userPassword ) => {
	
	const hashedPwd = crypto.createHash('md5').update(userPassword).digest('hex');
	//const hashedP = await bcrypt.hash(userPassword, saltRounds);
	const _query = `SELECT * from "AspNetUsers" where "UserName" =$1 and "PasswordHash"=$2`;
	const userLogin = await pool.query (_query, [userName, hashedPwd]);
	if (userLogin.rowCount>0 ){
		return true;
	}
	return false;
}

