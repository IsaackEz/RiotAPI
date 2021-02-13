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
	res.render('champions.htm', { icon: URLi, name: nameID });
});

app.get('/riot/summoner', (req, res) => {
	let nameID = req.query.cs;

	const URLsi =
		'http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/';
	const URLext = '.png';
	const URLs =
		'https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +
		nameID +
		'?api_key=RGAPI-30300e07-3372-42cb-83df-6aaffd5accb0';

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
			console.log(error);
			res.send(error);
		});
});

//POST Routes

//Listen Server
app.listen(3000, () => {
	console.log('Server running on port 3000');
});
