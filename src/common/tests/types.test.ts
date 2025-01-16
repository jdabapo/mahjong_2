//@ts-ignore
import { expect, test, describe } from "bun:test";
import {Tile, Suit, Honor, Bonus, TileSort, isChow, CheckMahjong, TilesEqual, Hand} from "../types";

describe("determineWinningHand", ()=>{
    const ball2: Tile = {suit:"Balls",value:2};
    const Red_Dragon: Tile = {suit:"Red_Dragon"};
    const North: Tile = {suit:"North"};

    function createb(x:number|undefined): Tile {return {suit:"Bamboo",value:x}};
    test("winning hand, 17 tiles", () => {
        const hand:Hand = [ createb(1),
                          {suit:"Bamboo", value:1},
                          {suit:"Bamboo", value:2},
                          {suit:"Bamboo", value:2},
                          {suit:"Bamboo", value:2},
                          {suit:"Bamboo", value:3},
                          {suit:"Bamboo", value:3},
                          {suit:"Bamboo", value:3},
                          {suit:"Bamboo", value:4},
                          {suit:"Bamboo", value:4},
                          {suit:"Bamboo", value:4},
                          {suit:"Bamboo", value:5},
                          {suit:"Bamboo", value:5},
                          {suit:"Bamboo", value:5},
                          {suit:"Bamboo", value:6},
                          {suit:"Bamboo", value:6},
                          {suit:"Bamboo", value:6},];
        expect(CheckMahjong(hand)).toBe(true);
    })
    
    test("winning hand, 5 tiles pair, PUNG", () => {
        const hand:Hand = [ {suit:"Bamboo", value:1,},
                          {suit:"Bamboo", value:1},
                          {suit:"Bamboo", value:2},
                          {suit:"Bamboo", value:2},
                          {suit:"Bamboo", value:2}];
        expect(CheckMahjong(hand)).toBe(true);
    })
    test("winning hand, 5 chow pair, true", () => {
        const hand:Hand = [ {suit:"Bamboo", value:1,},
                          {suit:"Bamboo", value:2},
                          {suit:"Bamboo", value:3},
                          {suit:"Bamboo", value:7},
                          {suit:"Bamboo", value:7}];
        expect(CheckMahjong(hand)).toBe(true);
    })
    
    test("basic check for winning hand, one pair", () => {
        const hand:Tile[] = [ {suit:"Bamboo", value:1,},
                          {suit:"Bamboo", value:1}];
        expect(CheckMahjong(hand)).toBe(true);
    })

    test("two random tiles, false", () => {
        const hand: Hand = [{suit:"Balls",value:2}, {suit:"Balls",value:1}]
        expect(CheckMahjong(hand)).toBe(false);
    })

    test("five random tiles, false", () => {
        const hand: Hand = [{suit:"Balls",value:2}, {suit:"Balls",value:1},{suit:"Balls",value:2}, {suit:"Balls",value:1},{suit:"Balls",value:4}]
        expect(CheckMahjong(hand)).toBe(false);
    })

    test("17 random tiles, false", () => {
        const hand: Hand = [{suit:"Balls",value:2}, {suit:"Balls",value:1},{suit:"Balls",value:2}, {suit:"Balls",value:1},{suit:"Balls",value:4},
                            {suit:"Bamboo",value:2}, {suit:"Bamboo",value:1},{suit:"Bamboo",value:2}, {suit:"Bamboo",value:1},{suit:"Bamboo",value:4},
                            {suit:"Character",value:2}, {suit:"Character",value:1},{suit:"Character",value:2}, {suit:"Character",value:1},{suit:"Character",value:4},
                            {suit:"Red_Dragon"}, {suit:"Red_Dragon"},{suit:"White_Dragon"}, {suit:"White_Dragon"},{suit:"White_Dragon"},
                            {suit:"East"}]
        expect(CheckMahjong(hand)).toBe(false);
    })

    test("6 tiles, 1 kong, 1 pair, true", () =>{
        const hand: Hand = [ball2,ball2,ball2,ball2,Red_Dragon,Red_Dragon];
        expect(CheckMahjong(hand)).toBe(true);
    })

    test("6 tiles, 1 chow, 1 pair, random 1 false", () =>{
        const hand: Hand = [ball2,ball2,ball2,ball2,North,Red_Dragon];
        expect(CheckMahjong(hand)).toBe(false);
    })

    test("5 tiles, 1 PUNG, no pair, false", () =>{
        const hand: Hand = [ball2,ball2,ball2,North,Red_Dragon];
        expect(CheckMahjong(hand)).toBe(false);
    })

    test("8 tiles, 1 pair, 2 same chow same suit, true", ()=>{
        let ball1: Tile = {suit:"Balls",value:1};
        let ball3: Tile = {suit:"Balls",value:3};
        const hand: Hand = [ball1,ball1,ball2,ball2,ball3,ball3,North,North];
        expect(CheckMahjong(hand)).toBe(true);
    })

    test("11 tiles, 1 pair, 3 same chow same suit, true", ()=>{
        let ball1: Tile = {suit:"Balls",value:1};
        let ball3: Tile = {suit:"Balls",value:3};
        const hand: Hand = [ball1,ball1,ball1,ball2,ball2,ball2,ball3,ball3,ball3,North,North];
        expect(CheckMahjong(hand)).toBe(true);
    })

    test("15 tiles, 1 pair, 4 same chow same suit, true", ()=>{
        let ball1: Tile = {suit:"Balls",value:1};
        let ball3: Tile = {suit:"Balls",value:3};
        const hand: Hand = [ball1,ball1,ball1,ball1,ball2,ball2,ball2,ball2,ball3,ball3,ball3,ball3,North,North];
        expect(CheckMahjong(hand)).toBe(true);
    })

    test("15 tiles, 1 pair, 3 same chow same suit, false", ()=>{
        let ball1: Tile = {suit:"Balls",value:1};
        let ball3: Tile = {suit:"Balls",value:3};
        let ball4: Tile = {suit:"Balls",value:4};
        const hand: Hand = [ball1,ball1,ball1,ball4,ball2,ball2,ball2,ball2,ball3,ball3,ball3,ball3,North,North];
        expect(CheckMahjong(hand)).toBe(true);
    })

    test("8 tiles, 1 pair, 2 chow different suit true", ()=>{
        let c1: Tile = {suit:"Character",value:1};
        let c2: Tile = {suit:"Character",value:2};
        let c3: Tile = {suit:"Character",value:3};
        let ball1: Tile = {suit:"Balls",value:1};
        let ball3: Tile = {suit:"Balls",value:3};
        const hand: Hand = [c1,c3,c2,ball1,ball2,ball3,North,North];
        expect(CheckMahjong(hand)).toBe(true);
    })
    test("8 tiles, 1 pair, 2 chow continouos, true", ()=>{
        let c1: Tile = {suit:"Character",value:1};
        let c2: Tile = {suit:"Character",value:2};
        let c3: Tile = {suit:"Character",value:3};
        let c4: Tile = {suit:"Character",value:4};
        let c5: Tile = {suit:"Character",value:5};
        let c6: Tile = {suit:"Character",value:6};
        const hand: Hand = [c1,c3,c2,c4,c5,c6,North,North];
        expect(CheckMahjong(hand)).toBe(true);

    })
    test("8 tiles, 1 pair, 2 chow continouos, false", ()=>{
        let c3: Tile = {suit:"Character",value:3};
        let c4: Tile = {suit:"Character",value:4};
        let c6: Tile = {suit:"Character",value:6};
        let b1: Tile = {suit:"Balls",value:1};
        let b2: Tile = {suit:"Balls",value:2};
        let b3: Tile = {suit:"Balls",value:3};
        const hand: Hand = [b1,b2,b3,c3,c4,c6,North,North];
        expect(CheckMahjong(hand)).toBe(false);

    })
    test("11 tiles, 1 pair, 3 chow/PUNG, true", ()=>{
        let c1: Tile = {suit:"Character",value:1};
        let c2: Tile = {suit:"Character",value:2};
        let c3: Tile = {suit:"Character",value:3};
        const hand: Hand = [c1,c2,c3,c1,c2,c3,c1,c2,c3,North,North];
        expect(CheckMahjong(hand)).toBe(true);
    })
    test("8 tiles, 1 pair, 1 PUNG 1 chow, true", ()=>{
        let c1: Tile = {suit:"Character",value:1};
        let c2: Tile = {suit:"Character",value:2};
        let c3: Tile = {suit:"Character",value:3};
        const hand: Hand = [c1,c1,c1,c1,c2,c3,North,North];
        expect(CheckMahjong(hand)).toBe(true);
    })
})          

describe("tilesEqual testing", () => {
    test("check if equal tiles return equal", () => {
        const a:Tile = {suit:"Bamboo", value: 1};
        const b:Tile = {suit:"Bamboo", value: 1};
        expect(TilesEqual(a,b)).toBe(true);
    })
    
    test("check if non equal tiles return false", () => {
        const a:Tile = {suit:"Bamboo", value: 2};
        const b:Tile = {suit:"Bamboo", value: 1};
        expect(TilesEqual(a,b)).toBe(false);
    })

    test("check tiles without values that are the same", () => {
        const a:Tile = {suit:"Green_Dragon"};
        const b:Tile = {suit:"Green_Dragon"};
        expect(TilesEqual(a,b)).toBe(true);
    })

    test("check tiles without values that are different", () => {
        const a:Tile = {suit:"Green_Dragon"};
        const b:Tile = {suit:"Red_Dragon"};
        expect(TilesEqual(a,b)).toBe(false);
    })

    test("check tiles with/withuot values that are different", () => {
        const a:Tile = {suit:"Green_Dragon"};
        const b:Tile = {suit:"Bamboo", value:1};
        expect(TilesEqual(a,b)).toBe(false);
    })
})

describe("tileSort testing", () => {

    test("check same suit, different values", () => {
        const hand:Hand = [{suit:"Balls", value:2},
                            {suit:"Balls", value:1}];
        hand.sort(TileSort)
        expect(hand[0].value).toEqual(1);
        expect(hand[1].value).toEqual(2);
    })

    test("check same value, different suit", () => {
        const hand:Hand = [{suit:"Balls", value:1},
                            {suit:"Character", value:1}];
        hand.sort(TileSort)
        expect(hand[0].suit === "Character" && hand[1].suit === "Balls").toBe(true);
        expect(hand[0].suit).toEqual("Character");
        expect(hand[1].suit).toEqual("Balls");
    })

    test("check honors", () => {
        const hand:Hand = [{suit:"Red_Dragon"},
                            {suit:"Green_Dragon"}];
        hand.sort(TileSort)
        expect(hand[0].suit).toEqual("Green_Dragon");
        expect(hand[1].suit).toEqual("Red_Dragon");
    })

})