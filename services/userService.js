const userModel = require("../models/userModel");

module.exports.createUser = async (firstname, lastname, email, password, phone) => {
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