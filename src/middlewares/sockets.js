const { validationResult } = require("express-validator");

const io = require("socket.io");

// Securing Sockets to inauthenticated Users 
const initSocket = () => {
	
	io.use((socket, next) => {
		
	  if (socket.handshake.headers.auth) {
		const { auth } = socket.handshake.headers;
		const token = auth.split(" ")[1];
		jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
		  if (err) {
			throw new Error("Authentication error, Invalid Token supplied");
		  }
		  const theUser = await db.User.findByPk(decodedToken.id);
		  if (!theUser)
			throw new Error(
			  "Invalid Email or Password, Kindly contact the admin if this is an anomaly"
			);
		  socket.theUser = theUser;
		  return next();
		});
	  } else {
		throw new Error("Authentication error, Please provide a token");
	  }
	});
 }


const Validate = (req, res, next) => {
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = {};
        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(422).json({ error });
    }
    next();
}

module.exports{
	Validate
}


// ? handleJwt ?, handleJwt.verifyToken()