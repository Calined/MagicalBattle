

function Game() {

    this.fps = 60;
    this.timeStamp = 0;
    this.time = 0;
    this.dt = 0;

    this.render = function (drawObject) {

        ctx.drawImage(drawObject.image, drawObject.pos.x, drawObject.pos.y);
    }

}

function Position(x, y) {
    this.x = x;
    this.y = y;

}

function DrawObject(sourceFileString) {

    this.image = new Image();
    this.image.src = sourceFileString;

    this.pos = new Position(0, 0);

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


var background;

function startGame() {

    game = new Game();

    background = new DrawObject("background.png");

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

        game.render(background);


    }, 1000 / game.fps);


} 