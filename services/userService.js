const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { QueryTypes } = require("sequelize");
const userModel = require("../models/userModel");

const jwt = require('../services/jwtService');
const { pool, sequelize }  = require('../config/db');


module.exports.loginUser = async ( userName, userPassword ) => {
	
	//const hashedPwd= await crypto.createHash('md5').update(userPassword).digest('hex');
	const saltRounds = 10;
	const hashedPwd = await bcrypt.hash(userPassword, saltRounds);
	const hashedP = `$2b$10$3c0Jhn79un9WQVxCXKaZh.u6zRAHm5KRWvX5Bj5ouM6m95Kl48wPO`;

	//const hashedPassword = await bcrypt.compare(userPassword, hash);

	const _query = `SELECT * from "AspNetUsers" where "UserName" =$1 and "PasswordHash"=$2`;
	const userLogin = await pool.query (_query, [userName, hashedP]);
	if (userLogin.rowCount>0 ){
		return true;
	}
	return false;
}

module.exports.createUser = async ( firstname, lastname, email, password, phone ) => {
	const user = await userModel.create({
		fullname: {
		  firstname,
		  lastname,
		},
		email,
		password: hashedPassword,
		phone,
	});
	return user;
};