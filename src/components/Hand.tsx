import { FC, forwardRef, useState } from "react"
import { ReactSortable } from "react-sortablejs"
import {BackgroundImage, Group, ScrollArea} from "@mantine/core"
import {Tile, TileProps} from './Tile'
import { Hand } from "../common/types"
interface HandProps{
  hand: Hand
}


// This is just like a normal component, but now has a ref.
// Create a custom component that forwards the ref to Mantine's Group component
const CustomGroup = forwardRef<HTMLDivElement, any>((props, ref) => {
    return (
    <ScrollArea>
      <Group
      gap={0}
      ref={ref} {...props}
      />
    </ScrollArea>
    )
  })

export const Hand: FC<HandProps> = ({hand}) => {
  const [state, setState] = useState<TileProps[]>()

  return (
    <>
        <BackgroundImage
      src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
      radius="lg"
    >
    <ReactSortable
        tag={CustomGroup}
        list={state} 
        setList={setState}
        disabled={false}
        animation={100}
        ghostClass={ 'blue-background-class'}
    >
      {state.map(({value, suit, id}) => (
        <Tile key={id} id={id} value={value} suit={suit}/>
      ))}
    </ReactSortable>
    </BackgroundImage>
    </>

  )
}