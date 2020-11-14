require('../src/models/User'); // Because we don't want to use it as a variable, we don't use const (we want to use it once)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const requireAuth = require('../src/middlewares/requireAuth');
const authRoutes = require('../src/routs/authRouts');

//Create an express server
const app = express();

//Use the body json parser middleware to allow reading the json files from db
app.use(bodyParser.json());

//Use the different routes
app.use(authRoutes);

//Connect to mongo DB
const mongoUri = 'mongodb+srv://dbNir:bhRvnkl102030@cluster0-xuwhd.mongodb.net/beatfit?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
});

//Log success message if the db connection succeed
mongoose.connection.on('connected', () => {
	console.log('Connected to mongo instance');
});

//Log failure message if the db connection failed
mongoose.connection.on('error', (err) => {
	console.error('Error connecting to mongo', err);
});

//Make a get request to the user information when entering the default route of the app,
//that uses the requireAuth middleware to make sure the user will have access to db by verify the jwt
app.get('/', requireAuth, (req, res) => {
	res.send(req.user);
});

app.listen(3000, () => {
	console.log(`listening at http://localhost:${3000}`);
});
