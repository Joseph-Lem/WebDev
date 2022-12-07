const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))


let deck = []
    
let game = {
    playerHand: [],
    dealerHand: [],
}

function handValue(hand) 
{
    let sum = 0
    let numAces = 0
    console.log(sum)
    for(let card of hand){
        if(card.rank < 11 && card.rank > 1){
            sum = sum + card.rank
        }
        else if(card.rank > 10 && card.rank < 14){
            sum = sum + 10
        }
        else if(card.rank === 14){
            numAces++
            sum = sum + 11 
        }
    }
    while(sum > 21 && numAces > 0){
        sum = sum - 10
        numAces--
    }
    console.log(sum)
    return sum;
}

function makeShuffledDeck()
{
    let newDeck = [
        {"rank": 2, "suit": "hearts"}, 
        {"rank": 3, "suit": "hearts"},
        {"rank": 4, "suit": "hearts"},
        {"rank": 5, "suit": "hearts"},
        {"rank": 6, "suit": "hearts"},
        {"rank": 7, "suit": "hearts"},
        {"rank": 8, "suit": "hearts"},
        {"rank": 9, "suit": "hearts"},
        {"rank": 10, "suit": "hearts"},
        {"rank": 11, "suit": "hearts"},
        {"rank": 12, "suit": "hearts"},
        {"rank": 13, "suit": "hearts"},
        {"rank": 14, "suit": "hearts"},
        {"rank": 2, "suit": "spades"}, 
        {"rank": 3, "suit": "spades"},
        {"rank": 4, "suit": "spades"},
        {"rank": 5, "suit": "spades"},
        {"rank": 6, "suit": "spades"},
        {"rank": 7, "suit": "spades"},
        {"rank": 8, "suit": "spades"},
        {"rank": 9, "suit": "spades"},
        {"rank": 10, "suit": "spades"},
        {"rank": 11, "suit": "spades"},
        {"rank": 12, "suit": "spades"},
        {"rank": 13, "suit": "spades"},
        {"rank": 14, "suit": "spades"},
        {"rank": 2, "suit": "diamonds"}, 
        {"rank": 3, "suit": "diamonds"},
        {"rank": 4, "suit": "diamonds"},
        {"rank": 5, "suit": "diamonds"},
        {"rank": 6, "suit": "diamonds"},
        {"rank": 7, "suit": "diamonds"},
        {"rank": 8, "suit": "diamonds"},
        {"rank": 9, "suit": "diamonds"},
        {"rank": 10, "suit": "diamonds"},
        {"rank": 11, "suit": "diamonds"},
        {"rank": 12, "suit": "diamonds"},
        {"rank": 13, "suit": "diamonds"},
        {"rank": 14, "suit": "diamonds"},
        {"rank": 2, "suit": "clubs"}, 
        {"rank": 3, "suit": "clubs"},
        {"rank": 4, "suit": "clubs"},
        {"rank": 5, "suit": "clubs"},
        {"rank": 6, "suit": "clubs"},
        {"rank": 7, "suit": "clubs"},
        {"rank": 8, "suit": "clubs"},
        {"rank": 9, "suit": "clubs"},
        {"rank": 10, "suit": "clubs"},
        {"rank": 11, "suit": "clubs"},
        {"rank": 12, "suit": "clubs"},
        {"rank": 13, "suit": "clubs"},
        {"rank": 14, "suit": "clubs"}]

    let shuffledDeck = []
    while (newDeck.length > 0 ){
        let i = Math.floor(Math.random() * (newDeck.length))
        shuffledDeck.push(newDeck[i])
        newDeck.splice(i, 1)
    }
    deck = shuffledDeck; 
}

function resetGame()
{
    game.playerHand = []
    game.dealerHand = []

    makeShuffledDeck(deck)

    game.playerHand.push(deck.pop())
    game.playerHand.push(deck.pop())

    game.dealerHand.push(deck.pop())
    game.dealerHand.push(deck.pop())

    game.win = "no one wins "
    game.message = "this is a new game"

}
function win(hand1, hand2){
    //hand1 is player - hand2 is dealer 
    let hand1Val = handValue(hand1)
    let hand2Val = handValue(hand2)
    if(hand1Val > 21){
        //player busts 
        game.win = "dealer"
        game.message = "you busted, dealer wins"
        return;
    }
    if(hand2Val > 21){
        //dealer busts
        game.win = "player"
        game.message = "dealer busts, you win!"
        return;
    }
    if(hand1Val > hand2Val){ 
        //player wins 
        game.win = "player"
        game.message = "player beats the dealer!"
        return;
    }
    if(hand2Val > hand1Val){
        //dealer wins
        game.win = "dealer"
        game.message = "dealer beats the player"
        return;
    }
    if(hand1Val === hand2Val){
        if(hand1Val === 21 && game.playerHand.length < 3 && game.dealerHand.length > 2){
            game.win = "player"
            game.message = "player beats the dealer!"
            return;
        }
        if(hand1Val === 21 && hand1cards.length >= 3 && hand2cards.length >= 3){
            game.win = "draw"
            game.message = "you tied with the dealer"
            return; 
        }
        if(hand1Val === 21 && game.playerHand.length > 2 && game.dealerHand.length < 2){
            game.win = "dealer"
            game.message = "dealer beats the player"
            return;
        }
            game.win = "draw"
            game.message = "you tied with the dealer"
            return; 
    }
}
function playerConditions(hand){
    let handval = handValue(hand)
    if(handval > 0 && handval < 21){
        game.win = "no winner yet"
        game.message = "you can hit again or stand"
    }
    else if (handval > 21){
        game.win = "dealer"
        game.message = "the player busts"
    }
    else if (handval === 21 && hand.length > 2){
        game.win = "player"
        game.message = "you have 21!"
    }
    else if (handval === 21 && hand.length === 2){
        game.win = "BlackJack"
        game.message = "you have black jack!"
    }

}
function hit(hand)
{
    hand.push(deck.pop())
    playerConditions(hand) 
    return game;
}
function stand(hand){
    let handval = handValue(hand)
    while(handval < 17){
        hand.push(deck.pop())
        handval = handValue(hand)
    }
}


app.post("/hit", (req, res) => {
    hit(game.playerHand)
    playerConditions(game.playerHand)
    res.json(game)
});

app.post("/playerHandVal", (req, res) => {
    res.json(handValue(game.playerHand))
});

app.post("/dealerHandVal", (req, res) => {
    res.json(handValue(game.dealerHand))
});

app.post("/restart", (req, res) => {
    resetGame()
    res.json(game)
});

app.post("/stand", (req, res) => {
    stand(game.dealerHand)
    win(game.playerHand, game.dealerHand)
    // console.log(game.win)
    // console.log(game.message)
    // console.log(handValue(game.playerHand))
    // console.log(handValue(game.dealerHand))
    res.json(game)
});

app.listen(port, () => {
    console.log(`listening to u (on port ${port})`)
});