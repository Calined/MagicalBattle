function Card() {


}


function Hand() {

    this.cards = [];


    this.drawCard = function () {

        var card = new Card();

        this.cards.push(card);
    }

}
