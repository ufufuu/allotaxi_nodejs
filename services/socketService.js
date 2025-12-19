const { pool } = require("../config/db");
const crypto = require("crypto");

const userModel = require("../models/userModel");

module.exports.joinRoom = () => {
	
};

module.exports.logInitialSocketConnection = async ( socketId ) => {
	
	const id = crypto.randomBytes(20).toString('hex');
	const logQuery = `insert into "Connections" ("Id", "socketId", "UserId") values($1, $2, $3) returning *`;
	
	await pool.query(logQuery, [id, socketId, "4d08af0312b492e4ef225422c140c5b45e8a833c"]);
};

module.exports.getPersistedSocketId = async (Id ) => {
	const r = "4d08af0312b492e4ef225422c140c5b45e8a833c";
	Id = r;
	const getQuery = `select "socketId" from "Connections" where "UserId" =$1`;
	const socketId = await pool.query(getQuery, [Id]);
	return socketId.rows[0];
};