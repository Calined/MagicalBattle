

class PosFragment {

    constructor(value, min, max, limitMode) {

        this.value = value;
        this.min = min;
        this.max = max;

        //undefined or "lock" or "wrap"
        this.limitMode = limitMode;

    }


    set(value) {

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

    limit(min, max, limitMode) {

        this.min = min;
        this.max = max;
        this.limitMode = limitMode;

    }

}


class Position {

    get x() {
        return this.xPosFrag.value;
    }

    set x(value) {
        this.xPosFrag.set(value);
        this.gameObject.adjustDisplay();
    }

    get y() {
        return this.yPosFrag.value;
    }

    set y(value) {
        this.yPosFrag.set(value);
        this.gameObject.adjustDisplay();
    }

    constructor(x, y, gameObject) {

        this.xPosFrag = new PosFragment(x);
        this.yPosFrag = new PosFragment(y);

        //the gameObject this Position belongs to
        this.gameObject = gameObject;

    }

    move(xdiff, ydiff) {

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


class GameObject {

    get scale() {
        return this.relativeScale;
    }

    set scale(value) {
        this.relativeScale = value;
        //adjust the renderscales of itself and all children
        this.adjustDisplay();
    }

    set parent(value) {
        //remove from another child somewhere
        //if it was assigned beforehand(might be it's own creation!)
        if (this.actualHiddenParent) {
            this.actualHiddenParent.children.splice(this.getChildIndex(), 1);
        }

        this.actualHiddenParent = value;

        //add child
        if (value instanceof Game) { }
        else { this.actualHiddenParent.children.push(this); }

        this.adjustDisplay();
    }

    get parent() {
        return this.actualHiddenParent;
    }

    constructor(parent) {

        //relative pos 
        //this is supposed to be the center origin
        this.pos = new Position(0, 0, this);

        //this is the position where the card actually is rendered
        this.currentRenderPosX = 0;
        this.currentRenderPosY = 0;

        this.relativeScale = 1;
        this.currentRenderScale = 1;

        this.children = [];
        this.parent = parent;

    }

    adjustRenderPosition() {

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
        this.currentRenderPosY = fromCenterToBorderY;

        if (this.parent && this.parent.currentRenderPosX != undefined) {

            this.currentRenderPosX += this.parent.currentRenderPosX;
            this.currentRenderPosY += this.parent.currentRenderPosY;
        }

        this.children.forEach(function (child) {

            child.adjustRenderPosition();

        });

    }

    adjustRenderScale() {

        this.currentRenderScale = this.relativeScale;

        if (this.parent && this.parent.currentRenderScale) {
            this.currentRenderScale *= this.parent.currentRenderScale;
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

        for (var i = 0; i < this.parent.children.length; i++) {
            if (this.parent.children[i] === this) { return i; }
        }
    }


    destroy() {

        //call destroy for the children first
        this.children.forEach(function (child) { child.destroy(); });

        //remove myself from my parents child array
        this.parent.children.splice(this.getChildIndex(), 1);

        //delete me
        delete this;
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

        ctx.drawImage(this.image, this.currentRenderPosX, this.currentRenderPosY,
            this.currentRenderScale * this.image.naturalWidth,
            this.currentRenderScale * this.image.naturalHeight);


        if (debugRender) {

            //debug origin
            ctx.beginPath();
            ctx.fillStyle = "#FF0000";
            ctx.arc(this.currentRenderPosX, this.currentRenderPosY, 2, 0, 2 * Math.PI);
            ctx.fill();

        }
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
        ctx.fillText(this.text, this.currentRenderPosX, this.currentRenderPosY);

    }

}