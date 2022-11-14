const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))





let card = {
    rank: 3,
    suit: "hearts"
};



let hand = [
    {
        rank: 3,
        suit: "hearts"
    },
    {
        rank: 2,
        suit: "diamonds"
    },
    {
        rank: 4,
        suit: "spades"
    }

];

let game = {
    playerHand: [
        {
            rank: 3,
            suit: "hearts"
        },
        {
            rank: 2,
            suit: "diamonds"
        }, 
    ],
    dealerHand: [
        {
            rank: 3,
            suit: "hearts"
        },
        {
            rank: 2,
            suit: "diamonds"
        },
    ]
    
}

function cardValue(card)
{

}

function handValue(hand) 
{
    // loop over cards, add up values
}

function compareHands(hand1, hand2)
{

}

function makeShuffledDeck()
{
    // make array of 52 cards
    // shuffle it
    // return it
    for( i of deck){
        let cool = Math.floor(Math.random() * (i + 1))
        let shuffeledDeck = [];
        shuffeledDeck.pushback(cool);

    }
    return shuffeledDeck
}

function resetGame()
{
    // empty dealer/player hands
    // make a shuffled deck
    // deal to dealer (1 down, 1 up)
    // deal to player (both up)

}

app.post("/hit", (req, res) => {
    res.json("hit")
});

app.post("/stand", (req, res) => {
    res.json("stand")
});

app.post("/restart", (req, res) => {
    res.json("restart")
});

app.listen(port, () => {
    console.log(`listening to u (on port ${port})`)
});