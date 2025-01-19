import { socket } from "./socket/socket"
import { useSelector} from "react-redux"
export const MyForm = () => {

  const selectedTile = useSelector((state: any) => state.mahjong.selectedTile)
  const handleClick = () => {
    console.log('Emitting clientEvent')
    socket.emit('')
  }


  return <button onClick={handleClick}>Click Me</button>
}