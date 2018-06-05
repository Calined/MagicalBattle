class Player extends GameObject {

    constructor() {

        super(game.drawingRoot);

        this.hand = new Hand(this);

        //the container for the card the player currently has in play
        this.activeCardContainer = new GameObject(this);
        this.activeCardContainer.pos.move(0, -200);

        this.otherPlayer = undefined;

        //the selectionborders
        this.selectionBorder = undefined;

    }

    turn() {

        game.currentPlayer = this;

        this.selectionBorder = new DrawObject("card_selectionoverlay.png", this.hand.children[0]);
        this.selectionBorder.scale = 1;

    }

    moveSelection(direction) {

        this.selectionBorder.parent.pos.y = 0;

        var currentNum = this.selectionBorder.parent.getChildIndex();

        var destinationNum = Util.wrapArray(currentNum + direction, 0, this.hand.children.length - 1);

        //re setting the parent
        this.selectionBorder.parent = this.hand.children[destinationNum];
        this.selectionBorder.pos.move(0, 0);

        this.selectionBorder.parent.pos.move(0, -20);
    }

    confirmSelection() {

        this.selectionBorder.destroy();

        game.evaluateAttack(this.selectionBorder.parent, this.otherPlayer.activeCard);

        this.otherPlayer.turn();

    }


    putDownCard(card) {

        card.parent = this.activeCardContainer;

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
