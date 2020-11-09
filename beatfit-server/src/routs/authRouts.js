const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

//This router handles the sign up/sign in processes
//Determine how the server will responed if the user will make a request to the signup/signing endpoint (route)

//We will use this route when the user will try to sign up
const router = express.Router();

//Sign up
router.post('/signup', async (req, res) => {
	//Distract the email and password json objects from the body of the request

	const { userName, password } = req.body;

	//if there isn't an error
	try {
		//Create a new user show in the Users collection in the DB
		const user = new User({ userName, password });

		//Save this user to the DB
		await user.save();

		//Create a new jwt to this user according to his userId (that created automatically by the mongoDB)
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
		// send this token as a response of the request
		res.send({ token });
		//if an error ocoured throw an err msg
		//possible errors - key (email) is not uniqe, empty object and so on
	} catch (err) {
		return res.status(422).send(err.message);
	}

	//Sign in
	router.post('/signin', async (req, res) => {
		const { userName, password } = req.body;

		if (!userName || !password) {
			return res.status(422).send({ error: 'Must provide email and password' });
		}

		const user = await User.findOne({ userName }); //finds the user with the req email inside Users collection
		if (!user) {
			return res.status(422).send({ error: 'Invaild password or email' });
		}

		try {
			await user.comparePassword(password);
			const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
			res.send({ token });
		} catch (err) {
			return res.status(422).send({ error: 'Invaild password or email' });
		}
	});
});

module.exports = router;
