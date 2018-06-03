
function Game() {

    this.fps = 60;
    this.timeStamp = 0;
    this.time = 0;
    this.dt = 0;

    this.drawingRoot = new GameObject(this);

    this.renderThroughStack = function () {

        //if this object is a draw object, render it
        this.drawingRoot.checkForRender();

    }

}

var Util;

var game;
var gameCanvas;
var ctx;

var canvasScale = 5;

window.onload = function () {

    Util = new Util();

    gameCanvas = document.getElementById("gameCanvas");
    ctx = gameCanvas.getContext("2d");

    gameCanvas.width = 160 * canvasScale;
    gameCanvas.height = 90 * canvasScale;

    startGame();

};

var background1;
var background2;

var backgroundCol;

var hand1;

function startGame() {

    game = new Game();

    backgroundCol = new GameObject(game.drawingRoot);

    background1 = new DrawObject("background.png", backgroundCol);
    background2 = new DrawObject("background.png", backgroundCol);

    background1.pos.xPosFrag.limit(0, 1024, "wrap");
    background2.pos.xPosFrag.limit(-1024, 0, "wrap");

    background2.pos.move(-1024, 0);

    hand1 = new Hand();

    hand1.drawCard();
    hand1.drawCard();
    hand1.drawCard();

    requestAnimationFrame(updateCanvas);

}


