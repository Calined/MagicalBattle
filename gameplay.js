"use strict";

class Player extends GameObject {

    constructor(game) {

        super(game.drawingRoot);

        this.game = game;

        this.hand = new Hand(this);

        //the container for the card the player currently has in play
        this.activeCardContainer = new GameObject(this);
        this.activeCardContainer.move(game.player1 ? -100 : 100, -210);

        this.otherPlayer = undefined;

        //the selectionborders
        this.selectionBorder = undefined;

        this.lifebarbg = new DrawObject("lifebarbackground.png", this);
        this.lifebarbg.scale = 0.5;
        this.lifebarbg.move(0, -400);

        this.lifebar = new DrawObject("lifebar.png", this.lifebarbg);

        this.lifebar.health = 3;

    }

    turn() {

        //remove old card if there is any
        if (this.activeCardContainer.children[0]) {
            this.activeCardContainer.children[0].destroy();
        }

        game.currentPlayer = this;

        this.selectionBorder = new DrawObject("card_selectionoverlay.png", this.hand.children[0]);
        this.selectionBorder.scale = 1;

        this.moveSelection(0);

    }

    moveSelection(direction) {

        this.selectionBorder.parent.y = 0;

        var currentNum = this.selectionBorder.parent.getChildIndex();

        var destinationNum = Util.wrapArray(currentNum + direction, 0, this.hand.children.length - 1);

        //re setting the parent
        this.selectionBorder.parent = this.hand.children[destinationNum];
        this.selectionBorder.move(0, 0);

        this.selectionBorder.parent.move(0, -20);
    }

    confirmSelection() {

        this.selectionBorder.destroy();

        game.evaluateAttack(this.selectionBorder.parent, this.otherPlayer.activeCardContainer.children[0]);

    }

    loseHealth() {

        this.lifebar.health -= 1;

        this.lifebar.scale.x -= 1 / 3;
        this.lifebar.move(-128 / 3, 0);

        if (this.lifebar.health <= 0) {
            this.otherPlayer.win();
        }
    }


    win() {

        this.game.running = false;

        this.winText = new DrawText("You Win!", this);
        this.winText.move(0, -300);

        //only one way, win triggers lose!
        this.otherPlayer.lose();
    }

    lose() {

        this.loseText = new DrawText("You Lose!", this);
        this.loseText.move(0, -300);

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

        this.scale = 0.4;

    }

}


class Hand extends GameObject {

    constructor(player) {

        super(player);

    }

    drawCard() {

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

        card.move(0, 100);

        this.arrange();

        card.activeAnimations.push(Animations.getNewAnimation("drawCard", this));

    }


    putDownCard(card) {

        card.parent = this.parent.activeCardContainer;
        card.scale = 0.6;
        card.x = 0;
        card.y = 0;

        this.drawCard();

    }


    arrange() {

        this.children.forEach(function (card) {

            card.x = card.getChildIndex() * 75 - 75;

        });

    }

}