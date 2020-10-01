const express = require('express');
const router = express.Router;

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


router.get("/", (_, res) => {
    res.send("Welcome to the BYU Basketball Roster API!");
  });
  
  router.get("/roster", (_, res) => {
    res.json({ ok: true, roster });
  });
  
  router.get("/player/:number", (req, res, next) => {
    const { number } = req.params;
    const player = roster.filter((player) => player.number == number)[0];
    if (number) {
        res.json({ ok: true, player });
    } else{
        next()
    }
    
  });
  
  router.post("/addplayer", (req, res) => {
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


module.exports = router;