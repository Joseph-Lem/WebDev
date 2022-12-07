let hitButton = document.querySelector("#hitB")
hitButton.addEventListener('click', async() => {

    let playerHandDiv = document.querySelector("div#playerHand")
    while(playerHandDiv.firstChild){
        playerHandDiv.removeChild(playerHandDiv.firstChild)
    } 

    let hitCard = await fetch('/hit', {method: 'POST'})
    let game = await hitCard.json()

    for(let card of game.playerHand){
        let numtoCard = card.rank
        console.log(card.rank)
        if(card.rank === 11){
            numtoCard = "jack"
        }
        if(card.rank === 12){
            numtoCard = "queen"
        }
        if(card.rank === 13){
            numtoCard = "king"
        }
        if(card.rank === 14){
            numtoCard = "ace"
        }
        let playerHandDiv = document.querySelector("div#playerHand")
        let img = document.createElement('img');
        img.setAttribute("src", `Deck/${numtoCard}_of_${card.suit}.png`);
        img.setAttribute("width", `200`);
        img.setAttribute("height", `300`);
        playerHandDiv.appendChild(img)
    }

    let stateOfGame = document.querySelector("div#gameState")
    while(stateOfGame.firstChild){
        stateOfGame.removeChild(stateOfGame.firstChild)
    }

    let headerStuff = document.querySelector("div#gameState");
    let h1 = document.createElement('h1');
    h1.textContent = `Winner: ${game.win} Message: ${game.message}`;
    headerStuff.appendChild(h1);

    if(game.win === "dealer"){
        document.querySelector("button#hitB").disabled = true;
    }
    if(game.win === "BlackJack"){
        document.querySelector("button#hitB").disabled = true;
    }
});

let resetButton = document.querySelector("#resetB")
resetButton.addEventListener('click', async() => {

    let playerHandDiv = document.querySelector("div#playerHand")
    while(playerHandDiv.firstChild){
        playerHandDiv.removeChild(playerHandDiv.firstChild)
    } 
    let dealerHandDiv = document.querySelector("div#dealerHand")
    while(dealerHandDiv.firstChild){
        dealerHandDiv.removeChild(dealerHandDiv.firstChild)
    }

    let Cards = await fetch('/restart', {method: 'POST'})
    let game = await Cards.json()
    
    
    for(let card of game.playerHand){

        
        let numtoCard = card.rank
        console.log(card.rank)
        if(card.rank === 11){
            numtoCard = "jack"
        }
        if(card.rank === 12){
            numtoCard = "queen"
        }
        if(card.rank === 13){
            numtoCard = "king"
        }
        if(card.rank === 14){
            numtoCard = "ace"
        }
        let playerHandDiv = document.querySelector("div#playerHand")
        let img = document.createElement('img');
        img.setAttribute("src", `Deck/${numtoCard}_of_${card.suit}.png`);
        img.setAttribute("width", `200`);
        img.setAttribute("height", `300`);
        playerHandDiv.appendChild(img)
    
    }
    let firstcard = true
    
    for(let card of game.dealerHand){
        if(firstcard){
            firstcard = false
            //display face down card
        let dealerHandDiv = document.querySelector("div#dealerHand")
        let img = document.createElement('img');
        img.setAttribute("src", `Deck/backCard.png`);
        img.setAttribute("width", `200`);
        img.setAttribute("height", `300`);
        dealerHandDiv.appendChild(img)
        }
        else{
        let numtoCard = card.rank
        console.log(card.rank)
        if(card.rank === 11){
            numtoCard = "jack"
        }
        if(card.rank === 12){
            numtoCard = "queen"
        }
        if(card.rank === 13){
            numtoCard = "king"
        }
        if(card.rank === 14){
            numtoCard = "ace"
        }
        let dealerHandDiv = document.querySelector("div#dealerHand")
        let img = document.createElement('img');
        img.setAttribute("src", `Deck/${numtoCard}_of_${card.suit}.png`);
        img.setAttribute("width", `200`);
        img.setAttribute("height", `300`);
        dealerHandDiv.appendChild(img)
    }
    }

    let stateOfGame = document.querySelector("div#gameState")
    while(stateOfGame.firstChild){
        stateOfGame.removeChild(stateOfGame.firstChild)
    }

    let headerStuff = document.querySelector("div#gameState");
    let h1 = document.createElement('h1');
    h1.textContent = `No winner yet. Do you want to hit or stand?`;
    headerStuff.appendChild(h1);

    //reseting button 
    document.querySelector("button#hitB").disabled = false;
    document.querySelector("button#standB").disabled = false;
    document.querySelector("button#resetB").disabled = true;

});

//stand
let standButton = document.querySelector("#standB")
standButton.addEventListener('click', async() => {

    let playerHandDiv = document.querySelector("div#playerHand")
    while(playerHandDiv.firstChild){
        playerHandDiv.removeChild(playerHandDiv.firstChild)
    } 
    let dealerHandDiv = document.querySelector("div#dealerHand")
    while(dealerHandDiv.firstChild){
        dealerHandDiv.removeChild(dealerHandDiv.firstChild)
    }

    let Cards = await fetch('/stand', {method: 'POST'})
    let game = await Cards.json()
    
    for(let card of game.playerHand){
        let numtoCard = card.rank
        console.log(card.rank)
        if(card.rank === 11){
            numtoCard = "jack"
        }
        if(card.rank === 12){
            numtoCard = "queen"
        }
        if(card.rank === 13){
            numtoCard = "king"
        }
        if(card.rank === 14){
            numtoCard = "ace"
        }
        let playerHandDiv = document.querySelector("div#playerHand")
        let img = document.createElement('img');
        img.setAttribute("src", `Deck/${numtoCard}_of_${card.suit}.png`);
        img.setAttribute("width", `200`);
        img.setAttribute("height", `300`);
        playerHandDiv.appendChild(img)
    }
    for(let card of game.dealerHand){
        let numtoCard = card.rank
        console.log(card.rank)
        if(card.rank === 11){
            numtoCard = "jack"
        }
        if(card.rank === 12){
            numtoCard = "queen"
        }
        if(card.rank === 13){
            numtoCard = "king"
        }
        if(card.rank === 14){
            numtoCard = "ace"
        }
        let dealerHandDiv = document.querySelector("div#dealerHand")
        let img = document.createElement('img');
        img.setAttribute("src", `Deck/${numtoCard}_of_${card.suit}.png`);
        img.setAttribute("width", `200`);
        img.setAttribute("height", `300`);
        dealerHandDiv.appendChild(img)
    }

    console.log(game)

    let stateOfGame = document.querySelector("div#gameState")
    while(stateOfGame.firstChild){
        stateOfGame.removeChild(stateOfGame.firstChild)
    }

    let headerStuff = document.querySelector("div#gameState");
    let h1 = document.createElement('h1');
    h1.textContent = `Winner: ${game.win} Message: ${game.message}`;
    headerStuff.appendChild(h1);

    document.querySelector("button#hitB").disabled = true;
    document.querySelector("button#standB").disabled = true;
    document.querySelector("button#resetB").disabled = false;

});


