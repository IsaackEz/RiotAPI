# **RiotAPI**

### **REST API using GET and POST**

This repository contains 5 examples of GET and 3 of POST for the API of Riot Games. <p>
Adding also 2 POST request from Api.Toys.

## **Requirements**

-  Node.js
-  Clone the repository and run `npm install` to install all the dependencies.

-  Rename the file ".env_sample" to ".env" and put your APIKEYs in the placeholder.

## **Documentation**

#### This documentation will help you to understand this API and show how to make different requests to the server. <p>

#### There are 2 URLs that you can use, the local one `http://localhost:8080` and the one that is on the cloud platform `https://riot-api-server.herokuapp.com` (while using the URL hosted on the cloud platform it might be down sometimes, this is because the API KEY needs to be updated every 24hr). All responses will return data in `json`.

## **GETs**

### There are two different GET request for champions `/champions` returns a list of all the champions with a compact information about them all. And there it is a individual request `champion/{championName}` for aditional data for the champion.

### **REQUEST URL**

```
GET https://riot-api-server.herokuapp.com/champions
GET http://localhost:8080/champions
```

### **RESPONSE BODY**

```
{
  "type": "champion",
  "format": "standAloneComplex",
  "version": "11.4.1",
  "data": {
    "Aatrox": {
      "version": "11.4.1",
      "id": "Aatrox",
      "key": "266",
      "name": "Aatrox",
      "title": "the Darkin Blade",
      "blurb": "Once honored defenders of Shurima against the Void, Aatrox and his brethren would eventually become an even greater threat to Runeterra, and were defeated only by cunning mortal sorcery. But after centuries of imprisonment, Aatrox was the first to find...",
      "info": {
        "attack": 8,
        "defense": 4,
        "magic": 3,
        "difficulty": 4
      },
      "image": {
        "full": "Aatrox.png",
        "sprite": "champion0.png",
        "group": "champion",
        "x": 0,
        "y": 0,
        "w": 48,
        "h": 48
      },
      "tags": [
        "Fighter",
        "Tank"
      ],
      "partype": "Blood Well",
      "stats": {
        "hp": 580,
        "hpperlevel": 90,
        "mp": 0,
        "mpperlevel": 0,
        "movespeed": 345,
        "armor": 38,
        "armorperlevel": 3.25,
        "spellblock": 32,
        "spellblockperlevel": 1.25,
        "attackrange": 175,
        "hpregen": 3,
        "hpregenperlevel": 1,
        "mpregen": 0,
        "mpregenperlevel": 0,
        "crit": 0,
        "critperlevel": 0,
        "attackdamage": 60,
        "attackdamageperlevel": 5,
        "attackspeedperlevel": 2.5,
        "attackspeed": 0.651
      }
    },
    "Ahri": {
      "version": "11.4.1",
      "id": "Ahri",
      "key": "103",
      "name": "Ahri",
      "title": "the Nine-Tailed Fox",
```

### **REQUEST URL**

```
GET https://riot-api-server.herokuapp.com/champions/Annie
GET http://localhost:8080/champions/Annie
```

### **RESPONSE BODY**

```

  "type": "champion",
  "format": "standAloneComplex",
  "version": "11.3.1",
  "data": {
    "Annie": {
      "id": "Annie",
      "key": "1",
      "name": "Annie",
      "title": "the Dark Child",
      "image": {
        "full": "Annie.png",
        "sprite": "champion0.png",
        "group": "champion",
        "x": 288,
        "y": 0,
        "w": 48,
        "h": 48
      },
      "skins": [
        {
          "id": "1000",
          "num": 0,
          "name": "default",
          "chromas": false
        },
        {
          "id": "1001",
          "num": 1,
          "name": "Goth Annie",
          "chromas": false
        },
        {
          "id": "1002",
          "num": 2,
          "name": "Red Riding Annie",
          "chromas": false
        },
        {
          "id": "1003",
          "num": 3,
          "name": "Annie in Wonderland",
          "chromas": false
        },
        {
          "id": "1004",
          "num": 4,
          "name": "Prom Queen Annie",
          "chromas": false
        },
        {
          "id": "1005",
          "num": 5,
          "name": "Frostfire Annie",
          "chromas": false
        },
        {
          "id": "1006",
          "num": 6,
          "name": "Reverse Annie",
          "chromas": false
        },
```

### You can access the weekly rotation of champions with the `/champions/rotation` endpoint

### **REQUEST URL**

```
GET https://riot-api-server.herokuapp.com/champions/rotation
GET http://localhost:8080/champions/rotation
```

### **RESPONSE BODY**

```
{
  "freeChampionIds": [
    14,
    21,
    24,
    34,
    43,
    48,
    51,
    53,
    85,
    101,
    115,
    157,
    223,
    240,
    876
  ],
  "freeChampionIdsForNewPlayers": [
    18,
    81,
    92,
    141,
    37,
    238,
    19,
    45,
    25,
    64
  ],
  "maxNewPlayerLevel": 10
}
```

### With this endpoint `/summoner/{summonerName}` you get info of the summoner searched

### **REQUEST URL**

```
GET https://riot-api-server.herokuapp.com/summoner/IsaackEz
GET http://localhost:8080/summoner/IsaackEz
```

### **RESPONSE BODY**

```
{
  "id": "Gf46ow1cwILiZqyW7Q076qNdvnbrvouvDNkJ29if-FAMFw",
  "accountId": "SvxIV0tW8d2KxrknILwQVySygpVawYBdW1pGUpu3dKk",
  "puuid": "EgceivEU-_3aArB_34zWn3La2VhfjFdwixZE1tgjhzTlXXFuWtzfVyz2sE4DVzdEutELG-2z-8O97Q",
  "name": "IsaackEz",
  "profileIconId": 783,
  "revisionDate": 1613082801000,
  "summonerLevel": 165
}
```

### You can also get a match list with `/matchlist/{summonerName}` for the summoner entered

### **REQUEST URL**

```
GET https://riot-api-server.herokuapp.com/matchlist/IsaackEz
GET http://localhost:8080/matchlist/IsaackEz
```

### **RESPONSE BODY**

```
{
  "matches": [
    {
      "platformId": "LA1",
      "gameId": 1022088373,
      "champion": 133,
      "queue": 900,
      "season": 13,
      "timestamp": 1613110406650,
      "role": "DUO_SUPPORT",
      "lane": "NONE"
    },
    {
      "platformId": "LA1",
      "gameId": 1022090338,
      "champion": 120,
      "queue": 900,
      "season": 13,
      "timestamp": 1613108522745,
      "role": "NONE",
      "lane": "JUNGLE"
    },
    {
      "platformId": "LA1",
      "gameId": 1021893826,
      "champion": 89,
      "queue": 900,
      "season": 13,
      "timestamp": 1613091861220,
      "role": "DUO_SUPPORT",
      "lane": "NONE"
    },
    {
      "platformId": "LA1",
      "gameId": 1021874419,
      "champion": 498,
      "queue": 900,
      "season": 13,
      "timestamp": 1613090494793,
      "role": "DUO_SUPPORT",
      "lane": "NONE"
    },
```

## **POSTs**

### While using a POST you can send the body request with [Postman](https://www.postman.com/) using the format for each request.

<p>

### Returns provider ID

### **REQUEST URL**

```
POST https://riot-api-server.herokuapp.com/provider
POST http://localhost:8080/provider
```

### **REQUEST BODY:**

```
{
  "region": "",
  "url": ""
}
```

#### `region:` `string` The region in which the provider will be running tournaments. (Legal values: BR, EUNE, EUW, JP, LAN, LAS, NA, OCE, PBE, RU, TR).

#### `url:` `string` The provider's callback URL to which tournament game results in this region should be posted. The URL must be well-formed, use the http or https protocol, and use the default port for the protocol (http URLs must use port 80, https URLs must use port 443).

### **RESPONSE BODY**

```
{providerId}

Ej.
666
```

### Returns tournament ID

### **REQUEST URL**

```
POST https://riot-api-server.herokuapp.com/tourid
POST http://localhost:8080/tourid
```

### **REQUEST BODY:**

```
{
  "name": "",
  "providerId": 0
}
```

#### `name:` `string` The optional name of the tournament.

#### `providerId:` `int` The provider ID to specify the regional registered provider data to associate this tournament

### **RESPONSE BODY**

```
{tournamentId}

Ej.
6666
```

### Returns tournament codes

### **REQUEST URL**

```
POST https://riot-api-server.herokuapp.com/codes/{count}/{tournamentId}
POST http://localhost:8080/codes/{count}/{tournamentId}
```

### **REQUEST BODY:**

```
{
  "allowedSummonerIds": {},
  "mapType": "",
  "metadata": "",
  "pickType": "",
  "spectatorType": "",
  "teamSize": 0
}
```

#### `allowedSummonerIds:` `Set[string]` List of encrypted summonerIds in order to validate the players eligible to join the lobby.

#### `metadata:` `string` Optional string that may contain any data in any format, if specified at all.

#### `teamSize:` `int` The team size of the game. Valid values are 1-5.

#### `pickType:` `string` The pick type of the game. (Legal values: BLIND_PICK, DRAFT_MODE, ALL_RANDOM, TOURNAMENT_DRAFT)

#### `mapType:` `string` The map type of the game. (Legal values: SUMMONERS_RIFT, TWISTED_TREELINE, HOWLING_ABYSS)

#### `spectatorType:` `string` The spectator type of the game. (Legal values: NONE, LOBBYONLY, ALL)

#### `tournamentId:` `long` The tournament ID.

#### `count:` `int` The number of codes to create (max 1000)

### **RESPONSE BODY**

```
{[codes]}

Ej.
[
    "LAN6666-TOURNAMENTCODE0001",
    "LAN6666-TOURNAMENTCODE0002",
    "LAN6666-TOURNAMENTCODE0003",
    "LAN6666-TOURNAMENTCODE0004",
    "LAN6666-TOURNAMENTCODE0005",
    "LAN6666-TOURNAMENTCODE0006",
    "LAN6666-TOURNAMENTCODE0007",
    "LAN6666-TOURNAMENTCODE0008",
    "LAN6666-TOURNAMENTCODE0009",
    "LAN6666-TOURNAMENTCODE0010",
    "LAN6666-TOURNAMENTCODE0011",
    "LAN6666-TOURNAMENTCODE0012",
    "LAN6666-TOURNAMENTCODE0013",
    "LAN6666-TOURNAMENTCODE0014",
    "LAN6666-TOURNAMENTCODE0015"
]
```

### Return a list of possible English words from a String of nine letters.

### **REQUEST URL**

```
POST https://riot-api-server.herokuapp.com/words
POST http://localhost:8080/words
```

### **REQUEST BODY:**

```
{
    "text":"jazziness"
}
```

#### `text:` `string` String of nine letters.

### **RESPONSE BODY**

```
{
    "letters": [
        "J",
        "A",
        "Z",
        "Z",
        "I",
        "N",
        "E",
        "S",
        "S"
    ],
    "sorted": "AEIJNSSZZ",
    "found": [
        "AZINES",
        "JAZIES",
        "JAZZINESS",
        "JINS",
        "ZANIES",
        "ZEINS",
        "ZINES",
        "ZINS"
    ],
    "best_length": 9,
    "best_words": [
        "JAZZINESS"
    ],
    "cached": true,
    "time_taken": 0.031170845031738
}
```

### This request returns a randomly generated Guild Wars 2 Character Profile.

### **REQUEST URL**

```
POST https://riot-api-server.herokuapp.com/gw2
POST http://localhost:8080/gw2
```

### **REQUEST BODY:**

```
{
    "character": "human"
}
```

#### `character:` `string` Guild Wars 2 Character Profile (Values: "human", "charr", "asura", "norn", "sylvari".)

### **RESPONSE BODY**

```
{
    "species": "human",
    "gender": "male",
    "age": 61,
    "class": "guardian",
    "mastery": "firebrand",
    "professions": [
        "Huntsman",
        "Artificer",
        "Jeweler",
        "Chef"
    ],
    "body": {
        "height": "Average",
        "shape": "Slim"
    },
    "starting_gear": "conqueror's pauldrons",
    "personality": "dignity",
    "personal_story": {
        "stage1": "nobility",
        "stage2": "unknown parents",
        "stage3": "kormir"
    },
    "order": "vigil"
}
```
