

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


function Position(x, y, gameObject) {

    this.xPosFrag = new PosFragment(x);
    this.yPosFrag = new PosFragment(y);

    //the gameObject this Position belongs to
    this.gameObject = gameObject;

    Object.defineProperties(this, {
        "x": {
            "get": function () { return this.xPosFrag.value; },
            "set": function (value) {
                this.xPosFrag.set(value);
                this.gameObject.adjustRenderPosition();
            },
        },
        "y": {
            "get": function () { return this.yPosFrag.value; },
            "set": function (value) {
                this.yPosFrag.set(value);
                this.gameObject.adjustRenderPosition();
            },
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

    this.parent = parent;
    this.children = [];


    //add this as a child to the parent
    if (this.parent instanceof Game == false) {
        this.parent.children.push(this);
    }

    //relative pos 
    //this is supposed to be the center origin
    this.pos = new Position(0, 0, this);

    //this is the position where the card actually is rendered
    this.currentRenderPosX = 0;
    this.currentRenderPosY = 0;

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
        },
        "parent": {
            "set": function (value) {

                this.parent = value;

                //remove from another child somewhere
                //add child

                this.adjustRenderPosition();
            }
        }

    });

    this.adjustRenderPosition = function () {

        //the cards renderposition in relation to the center and the parent
        //from the center
        //middle minus half the width

        var fromCenterToBorderX = this.pos.x;
        var fromCenterToBorderY = this.pos.y;

        //if it has something to render/a size
        if (this.image) {
            fromCenterToBorderX -= this.image.naturalWidth * this.currentRenderScale / 2;
            fromCenterToBorderY -= this.image.naturalHeight * this.currentRenderScale / 2;
        }

        this.currentRenderPosX = fromCenterToBorderX;


        if (this.parent && this.parent.currentRenderPosX) {
            this.currentRenderPosX += this.parent.currentRenderPosX;
            this.currentRenderPosY += this.parent.currentRenderPosY;
        }


        this.children.forEach(function (child) {

            child.adjustRenderPosition();

        });

    }

    this.adjustRenderScale = function () {

        this.currentRenderScale = this.relativeScale;

        if (this.parent && this.parent.currentRenderScale) {
            this.currentRenderScale *= this.parent.currentRenderScale;
        }


        this.children.forEach(function (child) {

            child.adjustRenderScale();

        });

    }

    this.checkForRender = function () {

        if (this instanceof DrawObject) {
            this.render();
        }

        this.children.forEach(function (child) {

            child.checkForRender();

        });

    }

    //returns the Index this child has in it's parent
    this.getChildIndex = function () {

        for (i = 0; i < this.parent.children.length; i++) {
            if (this.parent.children[i] === this) { return i; }
        }
    }

}


function DrawObject(sourceFileString, parent) {

    GameObject.call(this, parent);

    this.image = new Image();
    this.image.src = sourceFileString;

    this.render = function () {

        ctx.drawImage(this.image, this.currentRenderPosX, this.currentRenderPosY,
            this.currentRenderScale * this.image.naturalWidth,
            this.currentRenderScale * this.image.naturalHeight);

    }

}