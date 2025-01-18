import { socket } from "./socket/socket"

export const MyForm = () => {
  const handleClick = () => {
    console.log('Emitting clientEvent')
    socket.emit('')
  }


  return <button onClick={handleClick}>Click Me</button>
}