const pg = require("pg");
const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConnection');

const User= sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
},{ 
	tableName: 'AspNetUsers',
	createdAt:false,
	updatedAt:false
});

module.exports = {
  User
  
  //Book
};


//const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
  /*
const userSchema = new pg.Schema(
  {
	fullname: {
		firstname: {
			type: String,
			required: true,
			minlength: 3,
		},
		lastname: {
			type: String,
			minlength: 3,
		  },
		},
	email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
	password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 10,
    },
  },
  { timestamps: true }
);
module.exports = pg.model("User", userSchema);

*/

//https://www.w3schools.com/nodejs/nodejs_api_auth.asp

// https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2

/*
: 26 moi


-- gisele - 26 mois emprisonnement
-- moha dzami cyriac - 
-- 3 ans empri sursis 
-- ki moun : 5 ans empr / 2 ans suris -- 1 M 42 m 
-- ella edouard dzessi : 10 ans / 7ans sursis--
-- abdoul osseni oussa : 15 ans --- 5 ans sursis --- 6 M
-- 15 
-- seyliou moh ali : 15 ans / 5 ans sursis
-- jordan acuset 3 ans sursis  -- 10 m
-- soceiete civile immobiliere
-- 
*/