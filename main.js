
function Game() {

    this.fps = 60;
    this.timeStamp = 0;
    this.time = 0;
    this.dt = 0;

    this.drawingStack = new DrawingStack();


}

function wrap(value, min, max) {

    if (value > max) { value = min + (value - max); }

    if (value < min) { value = max - (min - value); }

    return value;

}

function PosFragment(value, min, max, limitMode) {

    this.value = value;
    this.min = min;
    this.max = max;

    //undefined or "lock" or "wrap"
    this.limitMode = limitMode;

    this.set = function (value) {


        switch (this.limitMode) {

            case undefined:
                this.value = value;
                break;

            case "lock":
                this.value = Math.max(value, this.min);
                this.value = Math.min(value, this.min);
                break;

            case "wrap":
                this.value = wrap(value, this.min, this.max);

                break;
        }
    }

    this.limit = function (min, max, limitMode) {



        this.min = min;
        this.max = max;
        this.limitMode = limitMode;



    }

}

function Position(x, y) {

    this.xPosFrag = new PosFragment(x);
    this.yPosFrag = new PosFragment(y);

    Object.defineProperties(this, {
        "x": {
            "get": function () { return this.xPosFrag.value; },
            "set": function (value) { this.xPosFrag.set(value); },
        },
        "y": {
            "get": function () { return this.yPosFrag.value; },
            "set": function (value) { this.yPosFrag.set(value); },
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

    background1.pos.xPosFrag.limit(0, 1024, "wrap");
    background2.pos.xPosFrag.limit(-1024, 0, "wrap");

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