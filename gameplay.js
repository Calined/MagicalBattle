class Player extends GameObject {

    constructor() {

        super(game.drawingRoot);

        this.hand = new Hand(this);

        this.selection = undefined;

    }

    turn() {

        this.selection = new DrawObject("card_selectionoverlay.png", this.hand.children[0]);
        this.selection.scale = 1;

    }

    moveSelection(direction) {

        this.selection.parent.pos.y = 0;

        var currentNum = this.selection.parent.getChildIndex();

        var destinationNum = Util.wrapArray(currentNum + direction, 0, this.hand.children.length - 1);

        //re setting the parent
        this.selection.parent = this.hand.children[destinationNum];
        this.selection.pos.move(0, 0);

        this.selection.parent.pos.move(0, -20);
    }

    confirmSelection() {

        console.log(this.selection.parent.type);

    }

}


class Card extends GameObject {

    constructor(type, hand) {

        super(hand);

        this.type = type;

        new DrawObject("card_background.png", this);

        new DrawObject("card_type_" + type + ".png", this);

        new DrawObject("card_lightoverlay.png", this);

        this.scale = 0.5;

    }

}


class Hand extends GameObject {

    constructor(player) {

        super(player);

        this.drawCard = function () {

            var card = new Card("stone", this);

            //spread cards in hand
            card.pos.move((this.children.length - 1) * 100 - 100, 0);

        }
    }

}
