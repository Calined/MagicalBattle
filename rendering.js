

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
                this.value = Util.wrap(value, this.min, this.max);

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



function DrawingStack() {

    this.stack = [];


    this.remove = function () { }

    this.render = function () {

        this.stack.forEach(drawCollection => {

            drawCollection.collection.forEach(drawObject => {

                ctx.drawImage(drawObject.image, drawObject.pos.x, drawObject.pos.y, drawObject.scale * drawObject.image.naturalWidth, drawObject.scale * drawObject.image.naturalHeight);

            });

        });



    }
}



function DrawObject(sourceFileString) {

    this.image = new Image();
    this.image.src = sourceFileString;

    this.pos = new Position(0, 0);
    this.scale = 1;

    this.move = function (xdiff, ydiff) {

        this.pos.x += xdiff;
        this.pos.y += ydiff;

    }


}



function DrawCollection() {

    this.collection = [];

    game.drawingStack.stack.push(this);


    this.create = function (sourceFileString) {

        var drawObject = new DrawObject(sourceFileString);

        this.add(drawObject);

        return drawObject;

    }

    this.add = function (drawObject) {

        this.collection.push(drawObject);

    }

}


function scroll(xdiff, ydiff) {



}