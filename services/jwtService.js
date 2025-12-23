const jwt = require("jsonwebtoken");

require('dotenv').config();

class JwtService {
	constructor() {
		this.secret = process.env.JWT_SECRET;
		this.expiresIn = process.env.JWT_EXPIRES_IN; 
	}
	
	generateToken ( payload ) {
		return new Promise((resolve, reject) => {
			jwt.sign(payload, this.secret, { expiresIn: this.expiresIn }, (err, token) => {
			if (err) {
			  reject(err);
			} else {
			  resolve(token);
			}
		  });
		});
	};
	TokenVerify ( req, res, next ) {
		const authHeader = req.headers[' authorization '];
		const token = authHeader && authHeader.split('')[1];
		if( token ==null ){
			return res.sendStatus(401);
		}
		jwt.verify( token, secretKey, (err, decodedPayLoad )=> {
			if( err ){
				console.log( " Jwt verification failed: ", err.message);
				return res.sendStatus(403);
			}
				req.user = decodedPayLoad;
				next();
			});
	}

	verifyToken (token) {
		return new Promise((resolve, reject) => {
			
		});
	};
	
}
module.exports = new JwtService;