import { FC, useEffect, useState } from "react"
import { Image, keys } from "@mantine/core"
import { socket } from "./socket/socket"
import { EventTypes, MahjongMessage, MahjongMessagePayload } from "../common/events"
import { Suit, Honor, Bonus } from "../common/types"

// JTODO: put this in an env file eventually
const IMAGE_LOCATION = "./src/assets/images/default_light/"

export interface TileProps {
    value: number | null
    suit: Suit | Honor | Bonus
    id?: string
    key?: string
}

export const Tile: FC<TileProps> = ({ value, suit }) => {
    const [image,setImage] = useState<string>()

    // function will take in a value and suit, and determine which image to use within "../../common/assets/tiles", where each image will be a jpg
    const determineImage = (value: number | null, suit: string) => {
        const imageName = value !== null ? `${value}_${suit}.png` : `${suit}.png`
        const imagePath = `${IMAGE_LOCATION}${imageName}`
        setImage(imagePath)
    }
    
    useEffect(() => {
        determineImage(value,suit)
    }, [])

    return(
        <Image
        src={image}
        height='100%' // Set a fixed height
        fit="scale-down" // Prevents scaling up
        style={{ margin: 0 }}
        onClick={() => {

            const payload: MahjongMessagePayload = {
                message: MahjongMessage.DISCARD,
                interactedTile: {value: value, suit: suit},
            }
            socket.emit(EventTypes.mahjongMessage, payload)
        }}
      />
  
    )
}
