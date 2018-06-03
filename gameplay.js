function Player() {

    GameObject.call(this, game.drawingRoot);

    this.hand = new Hand(this);

    this.turn = function () {

        new DrawObject("card_selectionoverlay.png", this.hand.children[0]).scale = 1;

    }

}


function Card(type, hand) {

    GameObject.call(this, hand);

    this.type = type;

    new DrawObject("card_background.png", this);

    new DrawObject("card_type_" + type + ".png", this);

    new DrawObject("card_lightoverlay.png", this);

    this.scale = 0.5;

}


function Hand(player) {

    GameObject.call(this, player);

    this.drawCard = function () {

        var card = new Card("stone", this);

        //spread cards in hand
        card.pos.move((this.children.length - 1) * 100, 0);

    }

}
