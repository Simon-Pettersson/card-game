import Card from "./Card";

export default class Player {
    // Name, ID?, Chips, Hand, currentBet, isFolded
    // Earnings for leaderboard? 
    chips: number = 0; // Default starting chips
    private hand: Card[] = [];
    currentBet: number = 0;
    isFolded: boolean = false;
    isAllIn: boolean = false;

    constructor(public id: string, public name: string) {} 

    check(): PlayerAction {
        if (this.isFolded) {
            throw new Error(`${this.name} has folded and cannot check.`);
        }
        return PlayerAction.Check;
    }

    call(bet: number): PlayerAction {
        if (this.isFolded) {
            throw new Error(`${this.name} has folded and cannot call.`);
        }
        // Logic to match the current bet
        if (this.chips <= bet) {
            return this.allIn()
        }
        this.chips -= bet;
        this.currentBet += bet;
        return PlayerAction.Call;
    }

    bet(amount: number): PlayerAction {
        if (this.isFolded) {
            throw new Error(`${this.name} has folded and cannot bet.`);
        }
        if (amount > this.chips) {
            throw new Error(`${this.name} does not have enough chips to bet.`);
        }
        if (amount <= 0) {
            throw new Error(`${this.name} cannot bet a non-positive amount.`);
        }
        if (amount === this.chips) {
            return this.allIn();
        }
        this.chips -= amount;
        this.currentBet += amount;
        return PlayerAction.Bet;
    }

    fold(): PlayerAction {
        this.isFolded = true;
        //this.hand = []; // Clear hand when folded //TODO: Decide if we want to clear the hand or collect the cards back into the deck after the round
        return PlayerAction.Fold;
    }

    raise(amount: number, previousBet: number): PlayerAction {
        if (this.isFolded) {
            throw new Error(`${this.name} has folded and cannot raise.`);
        }
        if (amount > this.chips) {
            throw new Error(`${this.name} does not have enough chips to raise.`);
        }
        if (amount <= 0) {
            throw new Error(`${this.name} cannot raise a non-positive amount.`);
        }
        if (amount === this.chips) {
            return this.allIn();
        }
        if (previousBet > this.currentBet) {
            this.chips -= (amount + (previousBet - this.currentBet));
            this.currentBet = previousBet + amount; 
        } else {
            this.chips -= amount;
            this.currentBet += amount;
        }
        return PlayerAction.Raise;
    }

    allIn(): PlayerAction {
        if (this.isFolded) {
            throw new Error(`${this.name} has folded and cannot go all-in.`);
        }
        this.currentBet += this.chips;
        this.chips = 0; // All chips are bet
        this.isAllIn = true; // Mark player as all-in
        return PlayerAction.AllIn;
    }
}

export enum PlayerAction {
    Check = "check",
    Call = "call",
    Bet = "bet",
    Fold = "fold",
    Raise = "raise",
    AllIn = "all-in"
}