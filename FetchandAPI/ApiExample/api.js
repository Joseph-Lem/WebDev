const express = require('express');
const app = express();
const fs = require("fs");
const { parse } = require("csv-parse");
const port = 6969;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

function readCsv(filename) {
    let rows = []
    return new Promise((resolve, reject) => {
        fs.createReadStream(filename)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                rows.push(row);
            })
            .on('end', () => {
                resolve(rows);
            })
            .on('error', reject)
    })

}
let allPlayerNonGoalie = readCsv("./PlayerStats.csv").then(rows => {
    console.log('finished!')
    //console.log(rows)
    return rows.map(player => {
        return {
            Rank: player[0], Name: player[1], Team: player[2], Goals: player[3],
            Assists: player[4], Points: player[5], PIM: player[6], playerid: player[8]
        }
    })
})

let allGoalieStats = readCsv("./GoalieStats.csv").then(rows => {
    console.log('all done!')
    return rows.map(goalie => {
        return {
            Rank: goalie[0], Name: goalie[1], Team: goalie[2], ShotsAttempted: goalie[7], 
            ShotsSaved: goalie[8], GoalsAllowed: goalie[9], SavePercent: goalie[10], GoalsAllowedPerGame: goalie[11],
            playerid: goalie[13]
        }
    })
})

app.get("/playerstats", async(req, res) => {
    res.json(await allPlayerNonGoalie)
});

app.get("/goalieStats", async(req, res) => {
    res.json(await allGoalieStats)
});

app.get("/goalieStats/:playerid", async(req,res) => {
    for(let playergoalie of await allGoalieStats){
        if(playergoalie.playerid === req.params.playerid){
        return res.json(playergoalie)
        }
    }
    res.json("error: nahhhhhMan")
});
app.get("/playerstats/:playerid", async(req,res) => {
    for(let player of await allPlayerNonGoalie){
        if(player.playerid === req.params.playerid){
            return res.json(player)
        }
    }
    res.json("error: no way! it didn't work!")
});

app.listen(port, () => {
    console.log(`listening to u (on port ${port})`)
});