const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3003;
const { Client } = require('pg');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/', require('./routes/players'));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

const roster = [
  {
    name: "Hunter Erickson",
    number: 0,
    height: "6-3",
    weight: 180,
    position: "Guard",
    hometown: "Provo, Utah",
    lastSchool: "Timpview HS",
    rosterSeason: "2020-2021",
  },
];

app.get("/", (_, res) => {
  res.send("Welcome to the BYU Basketball Roster API!");
});

app.get("/roster", (_, res) => {
  res.json({ ok: true, roster });
});

app.get("/player/:number", (req, res, next) => {
  const { number } = req.params;
  const player = roster.filter((player) => player.number == number)[0];
  if (number) {
    res.json({ ok: true, player });
  } else {
    next();
  }
});

app.delete('/player/:number', (req, res, next) => {


})

app.post("/addplayer", (req, res) => {
  const {
    name,
    number,
    height,
    weight,
    position,
    hometown,
    lastSchool,
    rosterSeason,
  } = req.body;
  if (
    name &&
    number &&
    height &&
    weight &&
    position &&
    hometown &&
    lastSchool &&
    rosterSeason
  ) {
    roster.push({
      name,
      number,
      height,
      weight,
      position,
      hometown,
      lastSchool,
      rosterSeason,
    });
    res.json({ ok: true, roster });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
