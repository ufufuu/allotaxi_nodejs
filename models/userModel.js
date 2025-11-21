const pg = require("pg");

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