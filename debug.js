//set debug here
debug = false;


class DebugMode {
    constructor() {
        console.log("------------------------------------------------------------------------");
        console.log("Debug Mode on");


        this.testObjectScaleTranslation();

    }

    testObjectScaleTranslation() {
        console.log("testing for Object Scale Translation");

        console.log("creating new object");
        var testObject = new DrawObject("lifebar.png", game.drawingRoot);
        console.log("printing last details");
        console.log(testObject.scale.x, testObject.relativeScale.x, testObject.currentRenderScale.x);
        console.log("changing scale");
        testObject.scale.x = 10;
        console.log("printing new detais");
        console.log(testObject.scale.x, testObject.relativeScale.x, testObject.currentRenderScale.x);
        testObject.currentRenderScale.x = 10;//this works
        console.log(testObject.scale.x, testObject.relativeScale.x, testObject.currentRenderScale.x);
    }

}