import Player, { PlayerAction } from "./Player";
import Deck from "./Deck";
import Card from "./Card";

export default class Table {
    // Game logic will be implemented here
    // This is a placeholder for the Game class
    // Players, Deck, addPlayers, startGame, Deal, Betting rounds, Remove players, Common cards, 
    players: Player[] = [];
    deck: Deck;
    dealerIndex: number = 0; // Index of the dealer in the players array
    blindAmount: number; // Amount for blinds, can be set in the constructor or through a method
    communityCards: Card[] = []; // Community cards for the game
    currentBet: number = 0; // Current bet in the round
    startingChips: number; // Default starting chips for players

    constructor(blindAmount: number, startingChips: number) {
        this.deck = new Deck();
        this.blindAmount = blindAmount;
        this.startingChips = startingChips;
    }

    addPlayer(player: Player): void {
        this.players.push(player);
        player.chips = this.startingChips; // Set starting chips for the player
        if (this.players.length === 1) {
            this.dealerIndex = 0; // First player is the dealer
        } else if (this.players.length > 10) {
            throw new Error("Cannot add more than 6 players to the table.");
        }
    }

    removePlayer(playerId: string): void {
        this.players = this.players.filter(player => player.id !== playerId);
    }

    startGame(): void {
        this.deck.shuffle();
        // take blinds
        this.collectBlinds();

        // Deal cards to players
        this.dealCardsToPlayers();
        
        // Pre flop betting round
        this.bettingRound((this.dealerIndex + 3) % this.players.length); // Pre-flop betting starts after the dealer, small blind and big blind

        // Deal flop
        this.dealCommunityCards(3); 

        // Flop betting round
        this.bettingRound((this.dealerIndex + 1) % this.players.length); // Flop betting starts after the dealer

        // Deal turn
        this.dealCommunityCards(1); 

        // Turn betting round
        this.bettingRound((this.dealerIndex + 1) % this.players.length); // Turn betting starts after the dealer

        // Deal river
        this.dealCommunityCards(1);

        // River betting round
        this.bettingRound((this.dealerIndex + 1) % this.players.length); // River betting starts after the dealer

        // Additional game logic for starting the game can be added here
    }

    private collectBlinds(): void {
        const numPlayers = this.players.length;
        const smallBlindIndex = (this.dealerIndex + 1) % numPlayers;
        const bigBlindIndex = (this.dealerIndex + 2) % numPlayers;

        this.players[smallBlindIndex]?.bet(this.blindAmount / 2);
        this.players[bigBlindIndex]?.bet(this.blindAmount);
    }

    private dealCardsToPlayers(): void {
        for (let i = 0; i < 2; i++) { // Deal 2 cards to each player
            for (const player of this.players) {
                const card = this.deck.deal();
                if (card) {
                    player.receiveCard(card);
                }
            }
        }
    }

    private bettingRound(startIndex: number): RoundOutcome {
        for (let i = 0; i < this.players.length; i++) {
            const playerIndex = (startIndex + i) % this.players.length;
            const player = this.players[playerIndex];

            if (player) {
                if (player.isFolded) {
                    continue; // Skip folded players
                }

                const action = this.getPlayerDecision(player);

                switch (action) {
                    case PlayerAction.Call:
                        player.call(this.currentBet);
                        break;
                    case PlayerAction.Bet:
                        player.bet(player.currentBet + 10); // Example bet amount
                        break;
                    case PlayerAction.Raise:
                        player.raise(player.currentBet + 20, this.currentBet); // Example raise amount
                        break;
                    case PlayerAction.Fold:
                        player.fold();
                        break;
                    case PlayerAction.Check:
                        player.check();
                        break;
                    case PlayerAction.AllIn:
                        player.allIn();
                        break;
                    default:
                        throw new Error(`Unknown action: ${action}`);
                }
            }
        }
        // TODO: Check for edge cases like all players folding, Also need to handle raises and side pots
        if (this.players.filter(p => !p.isFolded).length <= 1) {
            return RoundOutcome.Finished; // If only one player remains, the round is finished
        }
        return RoundOutcome.Continue; // Continue to the next betting round or community card dealing

    }

    private getPlayerDecision(player: Player): PlayerAction {
        // Placeholder for getting player's decision
        // This could be replaced with actual game logic or user input handling
        return PlayerAction.Check; // Default action for now
    }

    private dealCommunityCards(numCards: number): void {
        for (let i = 0; i < numCards; i++) {
            const card = this.deck.deal();
            if (card) {
                this.communityCards.push(card);
            }
        }
    }
}

enum RoundOutcome {
        Continue, Finished
    }