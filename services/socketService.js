const { pool } = require("../config/db");
const crypto = require("crypto");

const userModel = require("../models/userModel");

module.exports.getPersistedSocketId = async (Id ) => {
	Id = 1;
	const getQuery = `select "socketId" from "Locations" where "Id" =$1`;
	const res = await pool.query(getQuery, [Id]);
	console.log(" in Socket service, socket Id is:", res.rows[0].socketId);
	return res.rows[0].socketId;
};

module.exports.logInitialSocketConnection = async ( socketId ) => {
	const id = crypto.randomBytes(20).toString('hex');
	const logQuery = `insert into "Connections" ("Id", "socketId", "UserId") values($1, $2, $3) returning *`;
	
	await pool.query(logQuery, [id, socketId, "4d08af0312b492e4ef225422c140c5b45e8a833c"]);
};

module.exports.joinRoom = () => {
	
};
