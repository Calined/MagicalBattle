

function DrawingStack() {

    this.stack = [];

    this.add = function (sourceFileString) {

        var drawObject = new DrawObject(sourceFileString);

        this.stack.push(drawObject);

        return drawObject;

    }

    this.remove = function () { }


    this.render = function () {

        this.stack.forEach(drawObject => {

            ctx.drawImage(drawObject.image, drawObject.pos.x, drawObject.pos.y);

        });

    }
}

function DrawObject(sourceFileString) {

    this.image = new Image();
    this.image.src = sourceFileString;

    this.pos = new Position(0, 0);

    this.move = function (xdiff, ydiff) {

        this.pos.x += xdiff;
        this.pos.y += ydiff;

    }


}



function DrawCollection() {



}


function scroll(xdiff, ydiff) {



}