//this router is currently not in use

const express = require('express');
const mongoose = require('mongoose');
const Program = mongoose.model('Program');

const router = express.Router();

router.post('/addprogram', async (req, res) => {
	const { program } = req.body;
	if (!program) {
		return res.status(422).send({ error: 'Program is undefined' });
	}

	try {
		const newProgram = new Program(program);
		await newProgram.save();
		console.log('test');
	} catch (err) {
		res.status(422).send({ error: err.message });
	}
});

router.get('/getprogram', async (req, res) => {
	const { username } = req.headers;
	if (!username) {
		return res.status(422).send({ error: 'User name is undefined' });
	}
	try {
		const program = await Program.findOne({ userName: username });
		res.send(program);
	} catch (err) {
		res.status(422).send({ error: err.message });
	}
});

module.exports = router;
