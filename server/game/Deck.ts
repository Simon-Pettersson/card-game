import Card from "./Card";

export default class Deck {
    private cards: Card[] = [];

    constructor() {
        for (let suit = 0; suit < 4; suit++) { // 0: Clubs, 1: Diamonds, 2: Spades, 3: Hearts
        for (let rank = 0; rank < 13; rank++) { // 0: Two, 1: Three, ..., 12: Ace
            this.cards.push(new Card(suit, rank));
        }
        }
    }

    shuffle(): void { // Fisher-Yates shuffle algorithm
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [this.cards[i], this.cards[j]] = [this.cards[j]!, this.cards[i]!]; // Swap cards
        }
    }   

    deal(): Card | null {
        if (this.cards.length === 0) {
            return null;
        }
        return this.cards.pop() || null;
    }

    collect(card: Card): void {
        if (this.cards.some(c => c.equals(card))) {
            return; // Card is already in the deck
        }
        this.cards.push(card);
    }
}