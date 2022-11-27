/**
 * @jest-environment jsdom
 */
const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require('../game');

jest.spyOn(window, 'alert').mockImplementation(() => { })

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe("pre-game", () => {
    test("clicking buttons before newGame should fail", () => {
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});

describe('game object contains correct keys', () => {
    test('score key exits', () => {
        expect('score' in game).toBe(true);
    });
    test('currentGame key exits', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('playerMoves key exits', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('choices key exits', () => {
        expect('choices' in game).toBe(true);
    });
    test('choices contains correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });
    test('turnNumber key exits', () => {
        expect('turnNumber' in game).toBe(true);
    });
    test('lastButton key exists', () => {
        expect('lastButton' in game).toBe(true);
    });
    test('turnInPrpgress key exists', () => {
        expect('turnInProgress' in game).toBe(true);
    });
    test('turnInPrpgress key value is false', () => {
        expect('turnInProgress' in game).toBe(true);
    });
});

describe('newGame works correctly', () => {
    //we want to set up the game state with some
    //fake values to see the newGame function
    //resets them
    beforeAll(() => {
        game.score = 42;
        game.currentGame = ['button1', 'button2'];
        game.playerMoves = ['button1', 'button2'];
        game.turnNumber = 42;
        document.getElementById('score').innerText = '42';
        newGame();
    });

    test('should set game score to zero', () => {
        expect(game.score).toEqual(0);
    });
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test('should clear the player moves array', () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test('should set game.turnNumber to zero', () => {
        expect(game.turnNumber).toEqual(0);
    });
    test('should display 0 for the element with the id of score', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
    test('expect data-listener to be true', () => {
        const elements = document.getElementsByClassName('circle');
        for(let element of elements) {
            expect(element.getAttribute('data-listener')).toEqual('true');
        }
    });
    test('should set turnInProgress value to false', () => {
        expect(game.turnInProgress).toBe(true);
    });
});

describe('Gameplay works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('addTurn adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test('should add correct class to light up the buttons', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test('should increment the score if the turn is correct', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test('should call an alert if the move is wrong', () => {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toBeCalledWith('Wrong Move!');
    });
    test('should toggle turnInProgress to true', () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test('clicking during computer sequence should fail', () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});