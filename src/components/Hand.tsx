import { FC, forwardRef, useState } from "react"
import { ReactSortable } from "react-sortablejs"
import {BackgroundImage, Group, ScrollArea} from "@mantine/core"
import {Tile, TileProps} from './Tile'
interface HandProps{
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

export const Hand: FC<HandProps> = () => {
  const [state, setState] = useState<TileProps[]>([
    { id: 1, value: 3, suit: 'Balls' },
    { id: 2, value: 1, suit: 'Balls' },
    { id: 3, value: 6, suit: 'Balls' },
    { id: 4, value: 1, suit: 'Balls' },
    { id: 5, value: 1, suit: 'Balls' },
    { id: 6, value: 1, suit: 'Balls' },
    { id: 7, value: 1, suit: 'Balls' },
    { id: 8, value: 1, suit: 'Balls' },
    { id: 9, value: 3, suit: 'Balls' },
    { id: 10, value: 1, suit: 'Balls' },
    { id: 11, value: 1, suit: 'Balls' },
    { id: 12, value: 1, suit: 'Balls' },
    { id: 13, value: 1, suit: 'Balls' },
    { id: 14, value: 1, suit: 'Balls' },
    { id: 15, value: 1, suit: 'Balls' },
    { id: 16, value: 1, suit: 'Balls' },
    { id: 17, value: 1, suit: 'Balls' },
    { id: 18, value: 1, suit: 'Balls' },
    { id: 19, value: 1, suit: 'Balls' },
  ])

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