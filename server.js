//Importing packages
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const { response } = require('express');

//Using packages
const app = express();

//Middleware to read json objs
app.use(express.json());
app.use(morgan('dev'));

//Routes to access the root directory of the API
app.get('/', (req, res) => {
	res.send('<h1>RIOT API</h1>');
});

app.get('/test', (req, res) => {
	res.json({
		prop1: 'Hello',
		prop2: 'World',
	});
});

//POST Routes

app.post('/post', (req, res) => {
	console.log(req.body.prop1);
	aux = req.body.prop1;
	//Answer to client
	res.send(`Recieved: ${aux} ${req.body.prop2}`);
});

//Testing for Axios APIs
app.get('/riot/champions', (req, res) => {
	const URL =
		'http://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/champion.json';

	axios
		.get(URL)
		.then(function (response) {
			console.log(response.data);
			res.send(response.data);
		})
		.catch(function (error) {
			console.log(error);
			res.send(error);
		});
});

app.get('/riot/champions/:id', (req, res) => {
	const URL = `http://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/champion/${req.params.id}.json`;

	axios
		.get(URL)
		.then(function (response) {
			console.log(response.data);
			res.send(response.data);
		})
		.catch(function (error) {
			console.log(error);
			res.send(error);
		});
});

//Listen Server
app.listen(3000, () => {
	console.log('Server running on port 3000');
});
