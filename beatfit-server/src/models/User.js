const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//This model creates a Users collection inside the mongoDB using the mongoose library

//Define the User object schema inside the db
const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: false,
	},
	age: {
		type: String,
		required: false,
	},
	height: {
		type: String,
		required: false,
	},
	weight: {
		type: String,
		required: false,
	},
	img: {
		type: String,
		required: false,
	},
});

//This is called pre-save hook
//In other words, this is a function thats going to run before saving an instance of a user to the db
//The reason we use a function key word instead of arrow function is that we want to use the key word "this" to get the user that been saved
//If we will use a regular arrow function, the context of "this" will become the entire model
userSchema.pre('save', function (next) {
	const user = this;

	//If the password hasn't been changes, we don't want to do nothing (continue to the next middleware)
	if (!user.isModified('password')) {
		return next();
	}

	//using the bcrypt library to genrate an "salt" string to be added to the hashed password
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		//hashing the user password and assign it to user.password
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

//Attaching a new function to the user schema methods
//that compare the inserted password and the user passward, and returns true if they are identical
userSchema.methods.comparePassword = function (candidatePassword) {
	const user = this;
	//A promise is a way to use async method and return a value.
	//Instead of immadiately retuning the final value, the method returns a "promise" to supply the value at some point in the future
	return new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
			if (err) {
				return reject(err);
			}
			if (!isMatch) {
				return reject(false);
			}
			resolve(true);
		});
	});
};

mongoose.model('User', userSchema);
//We are not epxort this model because we want to use it only once -
//to establish the User collection in the DB
//We don't want to establish it twice
