"use strict";

class Dimension {

    constructor(value) {

        this._value = value;

        //undefined or "lock" or "wrap"
        this.limitMode = undefined;

    }

    get value() {
        return this._value;
    }

    set value(value) {
        switch (this.limitMode) {

            case undefined:
                this._value = value;
                break;

            case "lock":
                this._value = Math.max(value, this.min);
                this._value = Math.min(value, this.min);
                break;

            case "wrap":
                this._value = Util.wrap(value, this.min, this.max);
                break;
        }
    }

    limit(min, max, limitMode) {

        this.min = min;
        this.max = max;
        this.limitMode = limitMode;

    }

}

class Vector {

    constructor(xVal, yVal) {

        this._x = new Dimension(xVal);
        this._y = new Dimension(yVal);
    }

    get x() {
        return this._x.value;
    }

    set x(value) {

        this._x.value = value;

    }

    get y() {
        return this._y.value;
    }

    set y(value) {
        this._y.value = value;
    }

}

class RelativeVector extends Vector {
    constructor(xVal, yVal, gameObject) {
        super(xVal, yVal);

        this.gameObject = gameObject;

    }

    get x() {
        return super.x;
    }

    set x(value) {

        super.x = value;
        this.gameObject.adjustDisplay();
    }

    get y() {
        return super.y;
    }

    set y(value) {
        super.y = value;
        this.gameObject.adjustDisplay();
    }

}


class GameObject {

    constructor(parent) {

        //relative pos 
        //this is supposed to be the center origin
        this.relativePos = new RelativeVector(0, 0, this);
        //this is the position where the card actually is rendered
        this.currentRenderPos = new Vector(0, 0);

        this.relativeScale = new RelativeVector(1, 1, this);
        this.currentRenderScale = new Vector(1, 1);

        this.children = [];

        this._parent = undefined;
        //calls secure method, so the children get set
        this.parent = parent;

        this.activeAnimations = [];

    }

    get x() {
        return this.relativePos.x;
    }

    set x(value) {
        this.relativePos.x = value;
        this.adjustDisplay();
    }

    get y() {
        return this.relativePos.y;
    }

    set y(value) {
        this.relativePos.y = value;
        this.adjustDisplay();
    }

    set scale(value) {
        this.relativeScale.x = value;
        this.relativeScale.y = value;
        //adjust the renderscales of itself and all children
        this.adjustDisplay();
    }

    get scale() {

        return this.relativeScale;

    }

    set parent(value) {

        //remove from another child somewhere
        //if it was assigned beforehand(might be it's own creation!)
        if (this._parent != undefined) {
            this._parent.children.splice(this.getChildIndex(), 1);
        }

        this._parent = value;

        //add child
        if (value instanceof Game) {} else {
            this._parent.children.push(this);
        }


        this.adjustDisplay();
    }

    get parent() {
        return this._parent;
    }

    move(xdiff, ydiff) {
        this.x += xdiff;
        this.y += ydiff;

    }

    adjustRenderPosition() {

        //the cards renderposition in relation to the center and the parent
        //from the center
        //middle minus half the width

        if (this.parent.currentRenderPos) {
            var newX = this.parent.currentRenderPos.x;
            var newY = this.parent.currentRenderPos.y;
        } else {
            var newX = 0;
            var newY = 0;
        }

        if (this.parent.image) {
            newX += this.parent.image.naturalWidth * this.parent.currentRenderScale.x / 2;
            newY += this.parent.image.naturalHeight * this.parent.currentRenderScale.y / 2;
        } else {
            //checking if this parent is window
            if (this.parent.currentRenderPos === undefined) {
                newX += gameCanvas.width / 2;
                newY += gameCanvas.height / 2;
            }
        }

        newX += this.x;
        newY += this.y;

        if (this.image) {
            newX -= this.image.naturalWidth * this.currentRenderScale.x / 2;
            newY -= this.image.naturalHeight * this.currentRenderScale.y / 2;
        }

        this.currentRenderPos.x = newX;
        this.currentRenderPos.y = newY;

        this.children.forEach(function (child) {

            child.adjustRenderPosition();

        });

    }

    adjustRenderScale() {

        this.currentRenderScale.x = this.scale.x;
        this.currentRenderScale.y = this.scale.y;

        if (this.parent && this.parent.currentRenderScale != undefined) {
            this.currentRenderScale.x *= this.parent.currentRenderScale.x;
            this.currentRenderScale.y *= this.parent.currentRenderScale.y;
        }


        this.children.forEach(function (child) {

            child.adjustRenderScale();

        });

    }

    adjustDisplay() {
        this.adjustRenderScale();
        this.adjustRenderPosition();
    }

    checkForRender() {

        if (this instanceof DrawObject || this instanceof DrawText) {
            this.render();
        }

        this.children.forEach(function (child) {

            child.checkForRender();

        });

    }

    //returns the Index this child has in it's parent
    getChildIndex() {

        return Util.getIndex(this.parent.children, this);

    }


    destroy() {

        //call destroy for the children first
        this.children.forEach(function (child) {
            child.destroy();
        });

        //remove myself from my parents child array
        this.parent.children.splice(this.getChildIndex(), 1);

        //delete me
        delete this;
    }

    //continues animations if they are there
    continueAnimations() {

        //continue animation on this one
        this.activeAnimations.forEach(animation => {

            animation.process(game.dt);

        });

        //continue with the children
        this.children.forEach(function (child) {

            child.continueAnimations();

        });

    }


    lerp() {

        this.move();
    }

}


class DrawObject extends GameObject {

    constructor(sourceFileString, parent) {

        super(parent);

        this.image = new Image();
        this.image.src = sourceFileString;

        this.adjustDisplay();

    }

    render() {

        ctx.drawImage(this.image, this.currentRenderPos.x, this.currentRenderPos.y,
            this.currentRenderScale.x * this.image.naturalWidth,
            this.currentRenderScale.y * this.image.naturalHeight);


        if (debugRender) {

            //debug origin
            ctx.beginPath();
            ctx.fillStyle = "#FF0000";
            ctx.arc(this.currentRenderPos.x, this.currentRenderPos.y, 2, 0, 2 * Math.PI);
            ctx.fill();

        }
    }


    get x() {
        return super.x;
    }
    set x(value) {
        super.x = value;
    }
    get y() {
        return super.y;
    }
    set y(value) {
        super.y = value;
    }
    get scale() {
        return super.scale;
    }
    set scale(value) {
        super.scale = value;
    }
    get parent() {
        return super.parent;
    }
    set parent(value) {
        super.parent = value;
    }


}

class DrawText extends GameObject {

    constructor(textContent, parent) {
        super(parent);

        this.text = textContent;

    }

    render() {

        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.currentRenderPos.x, this.currentRenderPos.y);

    }

    get x() {
        return super.x;
    }
    set x(value) {
        super.x = value;
    }
    get y() {
        return super.y;
    }
    set y(value) {
        super.y = value;
    }
    get scale() {
        return super.scale;
    }
    set scale(value) {
        super.scale = value;
    }
    get parent() {
        return super.parent;
    }
    set parent(value) {
        super.parent = value;
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

        background1.move(0.1 * game.dt, 0);
        background2.move(0.1 * game.dt, 0);

        game.renderThroughStack();



    }, 1000 / game.fps);


}