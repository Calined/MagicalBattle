function Card(type, hand) {

    GameObject.call(this, hand);

    this.type = type;

    new DrawObject("card_background.png", this);

    new DrawObject(type + ".png", this);


}


function Hand() {

    GameObject.call(this, game.drawingRoot);

    this.drawCard = function () {

        new Card("stone", this);

    }

}
