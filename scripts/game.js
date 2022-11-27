let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    lastButton: '',
    turnInProgress: false,
    choices: ['button1', 'button2', 'button3', 'button4'],
}

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    game.turnNumber = 0;
    game.lastButton = '';
    game.turnInProgress = false;
    for(let circle of document.getElementsByClassName('circle')) {
        if(circle.getAttribute('data-listener') !== 'true') {
            circle.addEventListener('click' , (e) => {
                //if a turn is not in progress we allow the click, if it is
                //in progress then the click is disabled
                if(game.currentGame.length > 0 && !game.turnInProgress) {
                //depending on which circle id we click
                let move = e.target.getAttribute('id');
                game.lastButton = move;
                lightsOn(move);
                game.playerMoves.push(move);
                playerTurn();
                }
            });
            circle.setAttribute('data-listener', 'true');
        }
    }
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showScore() {
    document.getElementById('score').innerText = game.score;
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add('light');
    setTimeout(() => {
        document.getElementById(circ).classList.remove('light');
    }, 400);

}

function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if(game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

function playerTurn() {
    //to get the index of last element from our player moves
    //array
    let i = game.playerMoves.length - 1;
    //if player gets the answer correct then these two should match
    if(game.currentGame[i] === game.playerMoves[i]) {
        //we must be at the end of sequence and player got them all
        //correct
        if(game.currentGame.length == game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        } 
    }else {
            alert('Wrong Move!');
            newGame();
        }

}

//we put curly braces because
//exporting more than one object
//and function from this file
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };