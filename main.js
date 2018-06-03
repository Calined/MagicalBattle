
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

var backgroundCol;

var card1;

var hand1;

function startGame() {

    game = new Game();

    backgroundCol = new DrawCollection();

    background1 = backgroundCol.create("background.png");
    background2 = backgroundCol.create("background.png");

    background1.pos.xPosFrag.limit(0, 1024, "wrap");
    background2.pos.xPosFrag.limit(-1024, 0, "wrap");

    background2.move(-1024, 0);

    hand1 = new Hand();

    card1 = hand1.drawCard();
    card1.drawObject.scale = 0.4;

    requestAnimationFrame(updateCanvas);

}


