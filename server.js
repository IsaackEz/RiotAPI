//Importing packages
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();
const path = require('path');
const { request } = require('https');

//Using packages
const app = express();

//Middleware to read json objs
app.use(express.json());
app.use(morgan('dev'));
app.engine('htm', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//GETs
app.get('/', (req, res) => {
	res.render('index.htm', {
		title: 'RIOT API',
	});
});

app.get('/riot/champions', (req, res) => {
	let nameID = req.query.cs;
	const URL =
		'http://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/champion/' +
		nameID +
		'.json';
	const URLi =
		'http://ddragon.leagueoflegends.com/cdn/11.3.1/img/champion/' +
		nameID +
		'.png';

	axios
		.get(URL)
		.then(function (response) {
			image = response.data.data;
			console.log(image);
			res.render('champions.htm', { icon: URLi, name: nameID });
		})
		.catch(function (error) {
			res.send(error);
		});
});

app.get('/riot/summoner', (req, res) => {
	let nameID = req.query.cs;

	const URLsi =
		'http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/';
	const URLext = '.png';
	const URLs =
		'https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +
		nameID +
		'?api_key=RGAPI-************';

	axios
		.get(URLs)
		.then(function (response) {
			sumIcon = response.data.profileIconId;
			sumLevel = response.data.summonerLevel;
			res.render('summoner.htm', {
				icon: URLsi,
				iconExt: URLext,
				name: nameID,
				sumIcon: sumIcon,
				sumLevel: sumLevel,
			});
		})
		.catch(function (error) {
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

app.get('/riot/summoner/:name', (req, res) => {
	const URL = `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.name}?api_key=RGAPI-5cf3167e-a525-4432-8506-706085422dad`;

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
//POST Routes
app.post('/post', (req, res) => {
	aux = req.body.name;
	aux1 = req.body.id;
	//Answer to client
	res.send(`Hello ${aux}\n Your id is: ${aux1}`);
});

//Listen Server
app.listen(3000, () => {
	console.log('Server running on port 3000');
});
