//Importing packages
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const path = require('path');
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

app.get('/riot', (req, res) => {
	let nameID = req.query.search;
	let partID = [];
	let sumHist = [];
	let iconHist = [];
	let partKills = [];
	let partDeaths = [];
	let partAssists = [];
	let partItem0 = [];
	let partItem1 = [];
	let partItem2 = [];
	let partItem3 = [];
	let partItem4 = [];
	let partItem5 = [];
	let partItem6 = [];

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
								duration = response.data.gameDuration;
								minutes = Math.floor(duration / 60);
								seconds = duration % 60;
								partIdent = response.data.participantIdentities;
								for (let i = 0; i < partIdent.length; i++) {
									partID.push(partIdent[i].participantId);
									sumHist.push(partIdent[i].player.summonerName);
									iconHist.push(partIdent[i].player.profileIcon);
								}
								part = response.data.participants;
								for (let i = 0; i < part.length; i++) {
									partKills.push(part[i].stats.kills);
									partDeaths.push(part[i].stats.deaths);
									partAssists.push(part[i].stats.assists);
									partItem0.push(part[i].stats.item0);
									partItem1.push(part[i].stats.item1);
									partItem2.push(part[i].stats.item2);
									partItem3.push(part[i].stats.item3);
									partItem4.push(part[i].stats.item4);
									partItem5.push(part[i].stats.item5);
									partItem6.push(part[i].stats.item6);
								}
								URLmap =
									'http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map' +
									mapID +
									'.png';
								URLitem =
									'http://ddragon.leagueoflegends.com/cdn/11.4.1/img/item/';
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
									min: minutes,
									sec: seconds,
									participantID: partID,
									summonerName: sumHist,
									profIcon: iconHist,
									URLsi: URLsi,
									kills: partKills,
									deaths: partDeaths,
									assists: partAssists,
									item0: partItem0,
									item1: partItem1,
									item2: partItem2,
									item3: partItem3,
									item4: partItem4,
									item5: partItem5,
									item6: partItem6,
								});
							})
							.catch((error) => {
								res.send(error);
							});
					})
					.catch((error) => {
						res.send(error);
					});
			})
			.catch((error) => {
				res.send(error);
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

app.get('/riot/tournament/provider', (req, res) => {
	res.render('provider.htm');
});

app.get('/riot/tournament/id', (req, res) => {
	let impRegion = req.query.regionsearch;
	let impURL = req.query.urlsearch;
	const URLProv =
		'https://americas.api.riotgames.com/lol/tournament-stub/v4/providers' +
		process.env.API_KEY;
	axios
		.post(URLProv, {
			region: impRegion,
			url: impURL,
		})
		.then((response) => {
			providerID = response.data;
			res.render('tournamentid.htm', {
				reg: impRegion,
				urlP: impURL,
				provID: providerID,
			});
		})
		.catch((error) => {
			res.send(error);
		});
});

app.get('/riot/tournament/codes', (req, res) => {
	let impName = req.query.namesearch;
	let impProv = req.query.provsearch;
	const URLTour =
		'https://americas.api.riotgames.com/lol/tournament-stub/v4/tournaments' +
		process.env.API_KEY;
	axios
		.post(URLTour, {
			name: impName,
			providerId: impProv,
		})
		.then((response) => {
			tournamentID = response.data;
			res.render('codes.htm', {
				nameID: impName,
				provID: impProv,
				tourID: tournamentID,
			});
		})
		.catch((error) => {
			res.send(error);
		});
});

//TODO get an array from an input to post
app.get('/riot/tournament/', (req, res) => {
	// let tourImp = req.query.toursearch;
	let impSum = req.query.sumsearch;
	let impMap = req.query.mapsearch;
	let impMeta = req.query.metasearch;
	let impPick = req.query.picksearch;
	let impSpec = req.query.specsearch;
	let impTeam = req.query.teamsearch;
	const URLTour =
		'https://americas.api.riotgames.com/lol/tournament-stub/v4/codes?tournamentId=56' +
		process.env.CODES_API_KEY;
	axios
		.post(URLTour, {
			allowedSummonerIds: impSum,
			mapType: impMap,
			metadata: impMeta,
			pickType: impPick,
			spectatorType: impSpec,
			teamSize: impTeam,
		})
		.then((response) => {
			codes = response.data;
			res.render('tournament.htm', {
				sumID: impSum,
				map: impMap,
				meta: impMeta,
				pick: impPick,
				spec: impSpec,
				team: impTeam,
				code: codes,
			});
		})
		.catch((error) => {
			res.send(error);
		});
});

//GET HW
app.get('/champions', (req, res) => {
	const URL =
		'http://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json';

	axios
		.get(URL)
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});

app.get('/champions/rotation', (req, res) => {
	const URL =
		'https://la1.api.riotgames.com/lol/platform/v3/champion-rotations' +
		process.env.API_KEY;

	axios
		.get(URL)
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});

app.get('/champions/:id', (req, res) => {
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

app.get('/summoner/:name', (req, res) => {
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

app.get('/matchlist/:name', (req, res) => {
	const URL = `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.name}${process.env.API_KEY}`;

	axios
		.get(URL)
		.then((response) => {
			accountID = response.data.accountId;
			matchListURL =
				'https://la1.api.riotgames.com/lol/match/v4/matchlists/by-account/' +
				accountID +
				process.env.API_KEY;
			axios
				.get(matchListURL)
				.then((response) => {
					res.send(response.data);
				})
				.catch((error) => {
					res.send(error);
				});
		})
		.catch((error) => {
			res.send(error);
		});
});

//POST HW
app.post('/provider', (req, res) => {
	regionImp = req.body.region;
	URLp = req.body.url;
	const URLProv =
		'https://americas.api.riotgames.com/lol/tournament-stub/v4/providers' +
		process.env.API_KEY;
	axios
		.post(URLProv, {
			region: regionImp,
			url: URLp,
		})
		.then((response) => {
			providerID = response.data;
			res.send(`Provider ID: ${providerID}`);
		})
		.catch((error) => {
			res.send(error);
		});
});

app.post('/tourid', (req, res) => {
	nameImp = req.body.name;
	providerImp = req.body.providerId;
	const URLTour =
		'https://americas.api.riotgames.com/lol/tournament-stub/v4/tournaments' +
		process.env.API_KEY;
	axios
		.post(URLTour, {
			name: nameImp,
			providerId: providerImp,
		})
		.then((response) => {
			tourID = response.data;
			res.send(`Tournament ID: ${tourID}`);
		})
		.catch((error) => {
			res.send(error);
		});
});

app.post('/codes/:count/:tourID', (req, res) => {
	sumImp = req.body.allowedSummonerIds;
	mapImp = req.body.mapType;
	metaImp = req.body.metadata;
	pickImp = req.body.pickType;
	specImp = req.body.spectatorType;
	teamImp = req.body.teamSize;
	const URLCodes = `https://americas.api.riotgames.com/lol/tournament-stub/v4/codes?count=${req.params.count}&tournamentId=${req.params.tourID}${process.env.CODES_API_KEY}`;
	axios
		.post(URLCodes, {
			allowedSummonerIds: sumImp,
			mapType: mapImp,
			metadata: metaImp,
			pickType: pickImp,
			spectatorType: specImp,
			teamSize: teamImp,
		})
		.then((response) => {
			codesID = response.data;
			res.send(`Codes: \n ${codesID}`);
		})
		.catch((error) => {
			res.send(error);
		});
});

//POST request from an other API https://www.api.toys/api/index
app.post('/words', (req, res) => {
	word = req.body.text;
	const URLProv = 'https://www.api.toys/api/find_words/' + word;
	axios
		.post(URLProv, {
			text: word,
		})
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});

app.post('/gw2', (req, res) => {
	characterID = req.body.character;
	const URLProv = 'https://www.api.toys/api/gw2_character/' + characterID;
	axios
		.post(URLProv, {
			character: characterID,
		})
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
});

//Listen Server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
