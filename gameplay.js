function Card(type, hand) {

    GameObject.call(this, hand);

    this.type = type;

    new DrawObject("card_background.png", this);

    new DrawObject("card_type_" + type + ".png", this);

    this.scale = 0.5;

}


function Hand() {

    GameObject.call(this, game.drawingRoot);

    this.drawCard = function () {

        var card = new Card("stone", this);

        card.pos.move(100, 0);

    }

}
