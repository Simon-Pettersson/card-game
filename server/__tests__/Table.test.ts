import Table from "../game/Table";
import Player from "../game/Player";

describe("Game", () => {
    let table: Table;

    beforeEach(() => {
        table = new Table(10, 100);
    });

    it("Should create game and add players", () => {
        expect(table).toBeDefined();
        let player1 = new Player("1", "Alice");
        let player2 = new Player("2", "Bob");
        table.addPlayer(player1);
        table.addPlayer(player2);
        expect(player1.chips).toBe(100);
        expect(player2.chips).toBe(100);
        table.startGame();
        
    });
});