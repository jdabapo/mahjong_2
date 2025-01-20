import { Tile, Suit, Honor, Bonus } from "../../common/types";
import { generateRegularTiles, generateBonusTiles, generateHonorTiles } from "../../common/utils";
import { MAX_HAND_SIZE, Player } from "./Player";

  const MAX_TILES = 144;
  // Deck consists of 144 tiles, 136 are regular (4 of each number), 8 are bonus tiles (4 flowers and 4 seasons)
  // 108 regular (9*4*4)
  // There are also additionally 28 honor tiles, 3 for each dragon and 4 for each direction.

  // The Deck will consist of these 136 + 8 tiles, and will have some helper functions attached to it.
  // Shuffle, Init_Deal, Draw_One

  class Deck {
    constructor( isShuffled : boolean = true)
    {
      this.InitializeBank();
      if(isShuffled){
        this.Shuffle();
      }
    }

    /*   Yates_shuffle
    *    https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    *    -- To shuffle an array a of n elements (indices 0..n-1):
    *    for i from 0 to n−2 do
    *    j ← random integer such that i ≤ j < n
    *    exchange a[i] and a[j]
    */
    private Shuffle(): void {
      for (let i = 0; i < MAX_TILES - 2; i++){
          const j = Math.floor(Math.random() * (i + 1));
          [this.Bank[j], this.Bank[i]] = [this.Bank[i], this.Bank[j]];
      }
    };

    // TODO: Do just normal giving tiles for now
    // For now, just give each player their 16 tiles, and dealer gets 17 tiles
    Init_Deal(players: Player[], dealer: number): void {
      players.forEach(player => {
        for(let i = 0; i < MAX_HAND_SIZE - 1; i++){
          player.AddToHand(this.Deal_One());
        }
      });
      players[dealer].AddToHand(this.Deal_One());
    };
    
    // TODO: fix the else
    Deal_One(): Tile {
      if(this.Bank.length === 0){
        throw new Error('No more tiles in the deck')
      }
      return this.Bank.pop() ?? {suit: 'Bamboo', value: 1}
    };

    private InitializeBank(): void{
      if(this.Bank.length !== 0){
        this.Bank.length = 0;
      }
      const regularTiles = generateRegularTiles();
      const bonusTiles = generateBonusTiles();
      const honorTiles = generateHonorTiles();
      this.Bank = [...regularTiles, ...bonusTiles, ...honorTiles];
    }

    Remove_One(): void {
      this.Bank.pop();
    }

    Bank: Tile[] = []
  }

  

export default Deck
