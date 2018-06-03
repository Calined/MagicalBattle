
function Game() {

    this.fps = 60;
    this.timeStamp = 0;
    this.time = 0;
    this.dt = 0;

    this.drawingStack = new DrawingStack();


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

var card1;

function startGame() {

    game = new Game();

    background1 = game.drawingStack.add("background.png");
    background2 = game.drawingStack.add("background.png");

    background1.pos.xPosFrag.limit(0, 1024, "wrap");
    background2.pos.xPosFrag.limit(-1024, 0, "wrap");

    background2.move(-1024, 0);

    card1 = game.drawingStack.add("card_background.png");
    card1.scale = 0.4;

    requestAnimationFrame(updateCanvas);

}


