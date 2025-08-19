import Player, { PlayerAction } from "../game/Player";

describe("Player", () => {
    let player: Player;

    beforeEach(() => {
        player = new Player("1", "Bob");
    });

    it("should create a player with the correct id and name", () => {
        expect(player.id).toBe("1");
        expect(player.name).toBe("Bob");
    });

    it("should have an empty hand initially", () => {
        expect(player["hand"]).toBeDefined();
        expect(player["hand"].length).toBe(0);
    });

    it("should be able to call", () => {
        player.chips = 100; // Set chips for testing
        expect(player.call(50)).toBe(PlayerAction.Call);
        expect(player.chips).toBe(50); // Chips should be reduced by the bet amount
        expect(player.currentBet).toBe(50); // Current bet should be updated
        expect(player.call(200)).toBe(PlayerAction.AllIn); // Should return AllIn if chips are not enough
    });

    it("should be able to bet", () => {
        player.chips = 100; // Set chips for testing
        expect(player.bet(50)).toBe(PlayerAction.Bet);
        expect(player.chips).toBe(50); // Chips should be reduced by the bet
        expect(player.currentBet).toBe(50); // Current bet should be updated
        expect(player.bet(50)).toBe(PlayerAction.AllIn);
        expect(() => player.bet(200)).toThrow(); // Should throw error if not enough chips
        expect(() => player.bet(-10)).toThrow(); // Should throw error for non-positive bet
        expect(() => player.bet(0)).toThrow(); // Should throw error for zero bet
    });

    it("should be able to fold", () => {
        player.chips = 100; // Set chips for testing
        expect(player.fold()).toBe(PlayerAction.Fold);
        expect(player.isFolded).toBe(true);
        expect(() => player.check()).toThrow(); // Should throw error if player has folded
        expect(() => player.bet(50)).toThrow(); // Should throw error if player has folded
        expect(() => player.call(50)).toThrow(); // Should throw error if player has folded
        expect(() => player.raise(50, 0)).toThrow(); // Should throw error if player has folded
        expect(() => player.allIn()).toThrow(); // Should throw error if player has folded
    });

    it("should be able to check", () => {
        player.chips = 100; // Set chips for testing
        expect(player.check()).toBe(PlayerAction.Check);
        expect(player.currentBet).toBe(0); // Current bet should remain unchanged
    });

    it("should be able to raise", () => {
        let player2 = new Player("2", "Alice");
        player2.chips = 100; // Set chips for testing
        player2.bet(50); // Alice bets 50
        player.chips = 100; // Set chips for testing
        expect(() => player.raise(200, 50)).toThrow();
        expect(player.raise(20, 50)).toBe(PlayerAction.Raise);
        expect(player.chips).toBe(30); // Chips should be reduced by the raise amount
        expect(player.currentBet).toBe(70); // Current bet should be updated
        expect(() => player.raise(200, 0)).toThrow(); // Should throw error if not enough chips
        expect(() => player.raise(-10, 0)).toThrow(); // Should throw error for non-positive raise
        expect(() => player.raise(0, 0)).toThrow(); // Should throw error for zero raise
        expect(player.raise(30, 70)).toBe(PlayerAction.AllIn); // Should throw error if previous bet is higher than current bet
    });

    it("should be able to go all-in", () => {
        player.chips = 100; // Set chips for testing
        expect(player.allIn()).toBe(PlayerAction.AllIn);
        expect(player.chips).toBe(0); // Chips should be reduced to 0
        expect(player.isAllIn).toBe(true); // Player should be marked as all-in
        expect(player.currentBet).toBe(100); // Current bet should be equal to initial chips
    });
});