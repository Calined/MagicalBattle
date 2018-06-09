"use strict";

var debugRender = false;

class Game {

    constructor() {

        this.running = true;

        this.fps = 30;
        this.timeStamp = 0;
        this.time = 0;
        this.dt = 0;

        this.input = new Input();

        this.drawingRoot = new GameObject(this);

    }

    renderThroughStack() {

        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        //if this object is a draw object, render it
        this.drawingRoot.checkForRender();

    }

    evaluateAttack(activeCard, passiveCard) {

        //the other player placed a card
        if (passiveCard) {

            //try to attack it
            //if (activeCard.type)
            if (
                activeCard.type === "stone" && passiveCard.type === "scissor" ||
                activeCard.type === "scissor" && passiveCard.type === "paper" ||
                activeCard.type === "paper" && passiveCard.type === "stone" ||
                activeCard.type === "well"
            ) {
                passiveCard.parent.parent.loseHealth();
            }

            if (
                passiveCard.type === "stone" && activeCard.type === "scissor" ||
                passiveCard.type === "scissor" && activeCard.type === "paper" ||
                passiveCard.type === "paper" && activeCard.type === "stone" ||
                passiveCard.type === "well"
            ) {
                activeCard.parent.parent.loseHealth();
            }

        }

        //put down your own card
        activeCard.parent.putDownCard(activeCard);

        //if the game is still running after this
        if (this.running) {
            activeCard.parent.parent.otherPlayer.turn();
        }
    }

}

class Input {

    constructor() {

        document.onkeydown = function (e) {

            if (game.running) {

                switch (e.key) {

                    case "a":
                    case "ArrowLeft":
                        game.currentPlayer.moveSelection(-1);
                        break;

                    case "d":
                    case "ArrowRight":
                        game.currentPlayer.moveSelection(1);
                        break;

                    case " ":
                    case "Enter":
                        game.currentPlayer.confirmSelection();
                        break;
                }

            }

        }
    }

}

var game;
var gameCanvas;
var ctx;

var canvasScale = 5;

window.onload = function () {

    gameCanvas = document.getElementById("gameCanvas");
    ctx = gameCanvas.getContext("2d");

    gameCanvas.width = 160 * canvasScale;
    gameCanvas.height = 90 * canvasScale;

    startGame();

};

var background1;
var background2;

var backgroundCol;

function startGame() {

    game = new Game();

    backgroundCol = new GameObject(game.drawingRoot);

    background1 = new DrawObject("background.png", backgroundCol);
    background2 = new DrawObject("background.png", backgroundCol);

    background1.relativePos._x.limit(0, 1024, "wrap");
    background2.relativePos._x.limit(-1024, 0, "wrap");

    background2.move(1024, 0);

    var pinetreefg = new DrawObject("pinetree.png", backgroundCol);
    pinetreefg.move(50, 0);
    pinetreefg.scale = 0.25;

    //needs to be extra cause else it goes in circles
    game.player1 = new Player(game);
    game.player2 = new Player(game);

    game.player1.otherPlayer = game.player2;
    game.player2.otherPlayer = game.player1;

    game.player1.hand.drawCard();
    game.player1.hand.drawCard();
    game.player1.hand.drawCard();

    game.player1.move(-225, 200);
    game.player2.move(225, 200);

    game.player2.hand.drawCard();
    game.player2.hand.drawCard();
    game.player2.hand.drawCard();

    game.drawingRoot.adjustDisplay();

    game.player1.turn();

    game.player1.hand.arrange();

    requestAnimationFrame(updateCanvas);

    if (debug) { var debugMode = new DebugMode() }

}


