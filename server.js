//Importing packages
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const { response } = require('express');
const router = express.Router();
const path = require('path');
const { request } = require('https');
require('dotenv').config();

//Using packages
const app = express();

//Set a port for Heroku
let port = process.env.PORT || 8080;

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

app.get('/riot/', (req, res) => {
	let nameID = req.query.search;
	const URLsi =
		'http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/';
	const URLext = '.png';
	const URLs =
		'https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +
		nameID +
		process.env.API_KEY;
	if (nameID == undefined || nameID == '') {
		res.render('index.htm');
	} else {
		axios
			.get(URLs)
			.then((response) => {
				sumIcon = response.data.profileIconId;
				sumLevel = response.data.summonerLevel;
				accID = response.data.accountId;
				URLListMatch =
					'https://la1.api.riotgames.com/lol/match/v4/matchlists/by-account/' +
					accID +
					process.env.API_KEY;

				axios
					.get(URLListMatch)
					.then((response) => {
						role = response.data.matches[0].lane;
						matchId = response.data.matches[0].gameId;
						URLmatch =
							'https://la1.api.riotgames.com/lol/match/v4/matches/' +
							matchId +
							process.env.API_KEY;
						axios
							.get(URLmatch)
							.then((response) => {
								mapID = response.data.mapId;
								URLmap =
									'http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map' +
									mapID +
									'.png';
								res.render('summoner.htm', {
									icon: URLsi,
									iconExt: URLext,
									name: nameID,
									sumIcon: sumIcon,
									sumLevel: sumLevel,
									accountID: accID,
									role: role,
									map: mapID,
									mapIcon: URLmap,
								});
							})
							.catch((error) => {
								res.send(error);
								console.log(error);
							});
					})
					.catch((error) => {
						res.send(error);
						console.error(error);
					});
			})
			.catch((error) => {
				res.send(error);
				console.error(error);
			});
	}
});

app.get('/riot/champions', (req, res) => {
	res.render('champions.htm');
});

app.get('/riot/champion', (req, res) => {
	let nameID = req.query.searchch;
	const URL =
		'http://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/champion/' +
		nameID +
		'.json';
	const URLi =
		'http://ddragon.leagueoflegends.com/cdn/11.3.1/img/champion/' +
		nameID +
		'.png';
	if (nameID == undefined || nameID == '') {
		res.render('champions.htm');
	} else {
		axios
			.all([axios.get(URL)])
			.then((response) => {
				titleCh = response[0].data.data[nameID].title;
				loreCh = response[0].data.data[nameID].lore;
				tagCh = response[0].data.data[nameID].tags;
				res.render('champion.htm', {
					icon: URLi,
					name: nameID,
					title: titleCh,
					lore: loreCh,
					tags: tagCh,
				});
			})
			.catch((error) => {
				res.send(error);
			});
	}
});

app.get('/riot/champions/:id', (req, res) => {
	const URL = `http://ddragon.leagueoflegends.com/cdn/11.3.1/data/en_US/champion/${req.params.id}.json`;

	axios
		.get(URL)
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});

app.get('/riot/summoner/:name', (req, res) => {
	const URL = `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.name}${process.env.API_KEY}`;

	axios
		.get(URL)
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
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
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
