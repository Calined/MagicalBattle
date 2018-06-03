function Card(type) {

    this.type = type;

    this.backGround = new DrawObject("card_background.png");

    this.foreGround = new DrawObject(type + ".png");

}


function Hand() {

    this.cards = [];

    this.drawCollection = new DrawCollection();

    this.drawCard = function () {

        var card = new Card("stone");

        this.cards.push(card);
        this.drawCollection.add(card.drawObject);

        return card;
    }

}
