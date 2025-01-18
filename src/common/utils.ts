import {Tile} from './types'

export function TilesEqual(a:Tile, b:Tile): boolean {
    if(a === undefined || b === undefined) return false;
    if(a.value === undefined || b.value === undefined){
      return (a.suit === b.suit);
    }
    return (a.value === b.value && a.suit === b.suit);
  }

  let TileValues = new Map<string,number>([
    ["Bamboo", 0],
    ["Character", 10],
    ["Balls", 20],
    ["Green_Dragon", 30],
    ["Red_Dragon", 40],
    ["White_Dragon",50],
    ["East", 60],
    ["South",70],
    ["West",80],
    ["North",90]
  ]);

  export function TileSort(a:Tile, b:Tile):number {
    /*
      This function defines a custom sorting function (customSort) that compares the tiles first based on their suits (characters < bamboo < dots < winds, dragons) and then by their numeric or honor values.
      Returns a positive value if a > b, a negative value if a < b, and 0 of a = b
    */
    let aValue = 0;
    let bValue = 0;
  
    if(a.value !== undefined){
      const temp = TileValues.get(a.suit);
      if (temp !== undefined) {
        aValue = temp + a.value; 
      }
    }
    else {
      const temp = TileValues.get(a.suit);
      if( temp !== undefined) {
        aValue = temp;
      }
    }
  
    if(b.value !== undefined) {
      const temp = TileValues.get(b.suit);
      if (temp !== undefined) {
        bValue = temp + b.value; 
      }
    }
    else{
      const temp = TileValues.get(b.suit);
      if( temp !== undefined) {
        bValue = temp;
      }
    }
  
    return(aValue - bValue);
  }

  // Helper function to check for a valid chow (consecutive tiles of the same suit)
export function isChow(tile1: Tile, tile2: Tile, tile3: Tile): boolean {
  if (tile1.value === undefined || tile2.value === undefined || tile3.value === undefined) {
    return(false)
  } else {
    return (
      
      tile1.suit === tile2.suit &&
      tile2.suit === tile3.suit &&
      (tile2.value) - (tile1.value) === 1 &&
      (tile3.value) - (tile2.value) === 1
    );
  }
}

export function CheckMahjong(hand:Tile[]) : boolean {
  hand.sort(TileSort);
  function areAllTrue(arr: boolean[]): boolean {
    return arr.every((element) => element === true);
  }

  function checkWinningCombination(visited: boolean[], hasPair: boolean): boolean {
    if(hasPair === true && areAllTrue(visited)) {
      return true;
    }



    for(let i = 0; i < hand.length; i++) {
      
      if (!visited[i]) {
        visited[i] = true;
        //check for a pair, only need one
        if(hasPair === false) {
          //this for loop might not be needed, could be optimized here
          for (let j = i + 1; j < hand.length; j++) {
            if(TilesEqual(hand[i],hand[j])) {
              hasPair = true;
              visited[j] = true;
              if(checkWinningCombination(visited, hasPair)){
                return true;
              }
              visited[j] = false;
              hasPair = false;
            }
          }
        }

        //check for PUNG, kong, or chow
        else {

          //check for PUNG
          for(let j = i+1; j < hand.length; j++) {
            if(j+1 >= hand.length) {
              continue;
            }
            let k = j+1;
            if(!visited[j] && !visited[k]) {
              if(TilesEqual(hand[i], hand[j]) && TilesEqual(hand[k], hand[i])){
                visited[j] = true;
                visited[k] = true;
                if(checkWinningCombination(visited, hasPair)) {
                  return true;
                }
                else {

                  //check for kong
                  for(let l = k+1; l < hand.length; l++) {
                      if(!visited[l]) {
                      visited[l] = true;
                      if(TilesEqual(hand[l],hand[i])) {
                        if(checkWinningCombination(visited, hasPair)) {
                          return true;
                        }
                      }
                      visited[l] = false;
                    }
                  }
                }
                
              }
              visited[j] = false;
              visited[k] = false;
            }
            
          }

          //check for chow
          for(let j = i+1; j < hand.length; j++) {
            for(let k = j+1; k < hand.length; k++) {
              if(j < hand.length && k < hand.length) {
                if(!visited[j] && !visited[k]) {
                  if (isChow(hand[i], hand[j], hand[k])) {
                    visited[j] = true;
                    visited[k] = true;
                    
                    if (checkWinningCombination(visited, hasPair)) {
                      return true;
                    }

                    visited[j] = false;
                    visited[k] = false;
                  }
                } 
              }
            }
          }
        }

        visited[i] = false;
      }

    }
    return false;
  }

  const visited = Array(hand.length).fill(false);
  return checkWinningCombination(visited, false);
}