import Deck from '../game/Deck';
import Card from '../game/Card';

describe("Deck", () => {
    let deck: Deck;

    beforeEach(() => {
        deck = new Deck();
    });

    it("should create a deck with 52 cards", () => {
        expect(deck['cards'].length).toBe(52);
    });

    it("should shuffle the deck", () => {
        const originalDeck = [...deck['cards']];
        deck.shuffle();
        expect(deck['cards']).not.toEqual(originalDeck);
    });

    it("should deal a card from the deck", () => {
        const card = deck.deal();
        expect(card).toBeInstanceOf(Card);
        expect(deck['cards'].length).toBe(51);
    });

    it("should return null when dealing from an empty deck", () => {
        for (let i = 0; i < 52; i++) {
            deck.deal();
        }
        expect(deck.deal()).toBeNull();
    });

    it("should collect a card back into the deck", () => {
        const card = deck.deal();
        expect(card).toBeInstanceOf(Card);
        if (card !== null) {
            deck.collect(card);
            expect(deck['cards'].length).toBe(52);
            expect(deck['cards'][51]).toBe(card);
        } else {
            throw new Error("deal() returned null when a Card was expected");
        }
    });

    it("should not collect a card if it is already in the deck", () => {
        const card = new Card(0, 0); // Clubs, Two
        deck.collect(card);
        expect(deck['cards'].length).toBe(52); // Should still be 52 cards in the deck
    });
});