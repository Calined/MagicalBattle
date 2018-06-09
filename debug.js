//set debug here
debug = true;


class DebugMode {
    constructor() {
        console.log("------------------------------------------------------------------------");
        console.log("Debug Mode on");


        this.testObjectScaleTranslation();

    }

    testObjectScaleTranslation() {
        console.log("testing for Object Scale Translation");

        var testObject = new DrawObject("lifebar.png", game.drawingRoot);

        console.log(testObject.scale.x, testObject.relativeScale.x, testObject.currentRenderScale.x);
        testObject.scale.x = 10;
        console.log(testObject.scale.x, testObject.relativeScale.x, testObject.currentRenderScale.x);
        testObject.currentRenderScale.x = 10;//this works
        console.log(testObject.scale.x, testObject.relativeScale.x, testObject.currentRenderScale.x);
    }

}