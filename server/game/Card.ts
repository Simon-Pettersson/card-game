class Card {
    constructor(public suit: Suit, public rank: Rank) {}

    get name() {
        return `${Rank[this.rank]} of ${Suit[this.suit]}`;
    }
}

enum Suit {
    Hearts, Spades, Diamonds, Clubs 
}

enum Rank {
    Ace, King, Queen, Jack, Ten, Nine, Eight, Seven, Six, Five, Four, Three, Two
}