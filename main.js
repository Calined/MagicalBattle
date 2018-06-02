

function Game() {

    this.fps = 60;
    this.timeStamp = 0;
    this.time = 0;
    this.dt = 0;

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


function startGame() {

    game = new Game();


    requestAnimationFrame(updateCanvas);


}



function drawBackground() {
    background = new Image();
    background.src = "background.png";

    ctx.drawImage(background, 0, 0);
}



function updateCanvas() {
    setTimeout(function () {
        requestAnimationFrame(updateCanvas);
        var now = new Date().getTime(),
            dt = now - (game.time || now);
        game.dt = dt;

        game.time = now;

        game.timeStamp += game.dt;

        drawBackground();


    }, 1000 / game.fps);


} 