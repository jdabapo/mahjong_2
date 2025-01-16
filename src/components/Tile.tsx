import { useEffect, useState } from "react"
import { Image } from "@mantine/core"

// JTODO: put this in an env file eventually
const IMAGE_LOCATION = "./src/assets/images/default_light/"

export const Tile = (value: number | undefined, suit: string) => {
    const [image,setImage] = useState<string>()
    // function will take in a value and suit, and determine which image to use within "../../common/assets/tiles", where each image will be a jpg
    const determineImage = (value: number | undefined, suit: string) => {
        const imageName = value !== undefined ? `${value}_${suit}.png` : `${suit}.png`
        const imagePath = `${IMAGE_LOCATION}${imageName}`
        setImage(imagePath);
    };

    useEffect(() => {
        determineImage(value,suit)
    }, [])

    return(
        <Image
        src={image}
        height={60} // Set a fixed height
        fit="scale-down" // Prevents scaling up
        style={{ margin: 0 }}
      />
  
    )
}
