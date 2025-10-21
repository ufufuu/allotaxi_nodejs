const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type:String, required: true },
  role: { type: String, enum: ["superadmin", "admin", "user"], required: false },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },	
});

module.exports =mongoose.model("User", userSchema);