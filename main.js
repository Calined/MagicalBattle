
function Game() {

    this.fps = 60;
    this.timeStamp = 0;
    this.time = 0;
    this.dt = 0;

    this.drawingStack = new DrawingStack();


}

function PosFragment(value, min, max) {

    this.value = value;
    this.min = min;
    this.max = max;

    return this.value;

}

function Position(x, y) {

    this.xPosFrag = new PosFragment(x);
    this.yPosFrag = new PosFragment(y);

    Object.defineProperties(this, {
        "x": {
            "get": function () { return this.xPosFrag.value; },
            "set": function (value) { this.xPosFrag.value = value; }
        }
    });

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


function startGame() {

    game = new Game();

    background1 = game.drawingStack.add("background.png");
    background2 = game.drawingStack.add("background.png");

    background2.move(-1024, 0);

    requestAnimationFrame(updateCanvas);

}



function updateCanvas() {
    setTimeout(function () {
        requestAnimationFrame(updateCanvas);
        var now = new Date().getTime(),
            dt = now - (game.time || now);
        game.dt = dt;

        game.time = now;

        game.timeStamp += game.dt;

        background1.move(0.1 * game.dt, 0);
        background2.move(0.1 * game.dt, 0);

        game.drawingStack.render();


    }, 1000 / game.fps);


} 