const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const router = express.Router();

router.post('/edituser', async (req, res) => {
	const { user } = req.body;
	if (!user) {
		return res.status(422).send({ error: 'User is undefined' });
	}

	try {
		await User.updateOne({ userName: user.userName }, user);
	} catch (err) {
		res.status(422).send({ error: err.message });
	}
});

module.exports = router;
