import { forwardRef, useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"
import { BackgroundImage, Group, ScrollArea } from "@mantine/core"
import { Tile, TileProps } from './Tile'
import { useSelector } from "react-redux"

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

export const Hand = () => {
  const hand = useSelector((state: any) => state.mahjong.hand || [])
  const [state, setState] = useState<TileProps[]>(hand)
  
  useEffect(() => {
    setState(hand)
  }, [hand])

  return (
    <>
      {hand.length > 0 && (
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
            ghostClass={'blue-background-class'}
          >
            {/* TODO: FIX THE KEY VALUE */}
            {state.map(({ value, suit }, idx) => (
              <Tile key={idx+suit+value} id={idx+suit+value} value={value} suit={suit} />
            ))}
          </ReactSortable>
        </BackgroundImage>
      )}
    </>
  )
}