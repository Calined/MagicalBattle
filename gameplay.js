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

        this.lifebar = new DrawObject("lifebar.png", this);
        this.lifebar.scale = 0.5;
        this.lifebar.pos.move(0, -325);

    }

    turn() {

        //remove old card if there is any
        if (this.activeCardContainer.children[0]) { this.activeCardContainer.children[0].destroy(); }

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

        game.evaluateAttack(this.selectionBorder.parent, this.otherPlayer.activeCardContainer.children[0]);

    }


    putDownCard(card) {

        card.parent = this.activeCardContainer;

    }

    loseHealth() {
        this.lifebar.scale -= 0.5 / 3;
        this.lifebar.pos.move(-256 / 3, 64 / 3);
    }

}


class Card extends GameObject {

    constructor(type, hand) {

        super(hand);

        this.type = type;

        new DrawObject("card_background.png", this);

        this.typeDrawObject = new DrawObject("card_type_" + type + ".png", this);
        this.typeDrawObject.scale = 0.2;

        new DrawObject("card_lightoverlay.png", this);

        this.scale = 0.5;

    }

}


class Hand extends GameObject {

    constructor(player) {

        super(player);

        this.drawCard = function () {

            var pickedNum = Math.floor(Math.random() * 3);
            var pickedString = "";
            switch (pickedNum) {
                case 0:
                    pickedString = "stone";
                    break;

                case 1:
                    pickedString = "scissor";
                    break;

                case 2:
                    pickedString = "paper";
                    break;



            }

            var card = new Card(pickedString, this);

            //spread cards in hand
            card.pos.move((this.children.length - 1) * 100 - 100, 0);

        }
    }

}
