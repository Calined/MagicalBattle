

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


    this.move = function (xdiff, ydiff) {

        this.x += xdiff;
        this.y += ydiff;

    }

}




function updateCanvas() {
    setTimeout(function () {
        requestAnimationFrame(updateCanvas);
        var now = new Date().getTime(),
            dt = now - (game.time || now);
        game.dt = dt;

        game.time = now;

        game.timeStamp += game.dt;

        background1.pos.move(0.1 * game.dt, 0);
        background2.pos.move(0.1 * game.dt, 0);

        game.renderThroughStack();



    }, 1000 / game.fps);


}


function GameObject(parent) {

    this.pos = new Position(0, 0);
    this.relativeScale = 1;
    this.currentRenderScale = 1;

    Object.defineProperties(this, {
        "scale": {
            "get": function () {
                return this.relativeScale;
            },
            "set": function (value) {

                this.relativeScale = value;
                //adjust the renderscales of itself and all children
                this.adjustRenderScale();
            },
        }
    });

    this.adjustRenderScale = function () {

        this.currentRenderScale = this.relativeScale * this.parent.currentRenderScale;

        this.children.forEach(function (child) {

            child.adjustRenderScale();

        });

    }


    this.parent = parent;
    this.children = [];

    //add this as a child to the parent
    if (this.parent instanceof Game == false) {
        this.parent.children.push(this);
    }

    this.checkForRender = function () {

        if (this instanceof DrawObject) {
            this.render();
        }

        this.children.forEach(function (child) {

            child.checkForRender();

        });

    }

}


function DrawObject(sourceFileString, parent) {

    GameObject.call(this, parent);

    this.image = new Image();
    this.image.src = sourceFileString;

    this.render = function () {

        ctx.drawImage(this.image, this.pos.x, this.pos.y,
            this.currentRenderScale * this.image.naturalWidth,
            this.currentRenderScale * this.image.naturalHeight);

    }

}