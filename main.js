
var gameCanvas;
var ctx;

var canvasScale = 5;

window.onload = function () {

    gameCanvas = document.getElementById("gameCanvas");
    ctx = gameCanvas.getContext("2d");

    console.log(window.innerWidth);

    gameCanvas.width = 160 * canvasScale;
    gameCanvas.height = 90 * canvasScale;
};