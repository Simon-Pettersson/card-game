export default class Card {
    constructor(public suit: Suit, public rank: Rank) {}

    get name() {
        return `${Rank[this.rank]} of ${Suit[this.suit]}`;
    }

    public toString(): string {
        return this.name;
    }

    public equals(other: Card): boolean {
        return this.suit === other.suit && this.rank === other.rank;
    }
}

enum Suit {
    Clubs, Diamonds, Spades, Hearts 
}

enum Rank {
    Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King, Ace
}