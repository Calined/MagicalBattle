describe("General", function () {
  var testing = true;

  var gameCanvas = document.getElementById("gameCanvas");

  console.log(gameCanvas);

  var testGame;
  var testGameObject;
  var testDrawObject;



  beforeEach(function () {
    testGame = new Game();
    testGameObject = new GameObject(testGame.drawingRoot);
    testDrawObject = new DrawObject("lifebar.png", testGameObject);

  });

  it("should convert relative scale to render scale", function () {


    expect(testDrawObject.scale.x).toEqual(1);


  });


});
