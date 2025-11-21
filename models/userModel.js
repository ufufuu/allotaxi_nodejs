const pg = require("pg");


const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConnection');

const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { tableName: 'authors' });

module.exports = {
  Author,
  
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