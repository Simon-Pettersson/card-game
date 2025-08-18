import Card from "../game/Card";

describe("Card", () => {
    it("should create a card with the correct suit and rank", () => {
        const card = new Card(0, 0); // Clubs, Two
        expect(card.suit).toBe(0);
        expect(card.rank).toBe(0);
        expect(card.name).toBe("Two of Clubs");
    });

    it("should return the correct name for different cards", () => {
        const card1 = new Card(1, 12); // Diamonds, Ace
        const card2 = new Card(2, 11); // Spades, King
        expect(card1.name).toBe("Ace of Diamonds");
        expect(card2.name).toBe("King of Spades");
    });
});