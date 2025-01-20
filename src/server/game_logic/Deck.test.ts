import Deck from './Deck';
import { Player } from './Player';

describe('Deck', () => {
    let deck: Deck;

    beforeEach(() => {
        deck = new Deck();
    });

    test('should initialize with 144 tiles', () => {
        expect(deck.Bank.length).toBe(144);
    });

    test('should shuffle the deck', () => {
        const deck2 = new Deck(true)
        expect(deck.Bank).not.toEqual(deck2.Bank);
    });

    test('should deal 16 tiles to each player and 17 to the dealer', () => {
        const players = [new Player('player1'), new Player('player2'), new Player('player3'), new Player('player4')];
        const dealerIndex = 0;
        deck.Init_Deal(players, dealerIndex);

        players.forEach((player, index) => {
            if (index === dealerIndex) {
                expect(player.GetHand().length).toBe(17);
            } else {
                expect(player.GetHand().length).toBe(16);

            }
        });
    });

    test('should deal one tile from the deck', () => {
        const initialLength = deck.Bank.length;
        const tile = deck.Deal_One();
        expect(tile).toBeDefined();
        expect(deck.Bank.length).toBe(initialLength - 1);
    });

    test('should throw an error when dealing from an empty deck', () => {
        deck.Bank.length = 0;
        expect(() => deck.Deal_One()).toThrow('No more tiles in the deck');
    });

    test('should remove one tile from the deck', () => {
        const initialLength = deck.Bank.length;
        deck.Remove_One();
        expect(deck.Bank.length).toBe(initialLength - 1);
    });
});