const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		firstname: { type: String, required: true, },
		lastname: { type: String, required: true},
		password: { type: String},
		email: { type: String, required: true },
		role: {type: String, required: true,default:'simpleuser'},
		activated: {type: Number, required: true, default: 1},
		image: {type: String, required: false},
        experience:[{type:String , required:false}],
		newskills:[{type:String , required:false}],
		aquiredskills:[{type:String , required:false}],
		hobbies:[{type:String , required:false}],
		education:[{type:String , required:false}]

	},
	{ collection: 'users' } //specification 
)



const model = mongoose.model('UserSchema', UserSchema)

module.exports = model