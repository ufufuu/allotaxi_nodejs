const mngoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Type.ObjectId, ref: 'User', required: true },
	sellerId: { type: mongoose.Schema.Type.ObjectId, ref: 'User', required: true },
	amount: Number,
	applicableFee : Number,
	createdAt: Date,
	status: { type:String, enum: ["pending", "complete"] }
});

module.exports = mongoose.model('Payment', paymentSchema);