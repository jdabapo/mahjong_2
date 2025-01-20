import { Button } from "@mantine/core";
import { socket } from "./socket/socket"
import { EventTypes, PlayerMessage } from "../common/events";
import { useState } from "react";

export function ReadyButton() {
    const [ready, setReady] = useState(false)
    const handleClick = () => {
        setReady(!ready)
        const message = ready ? PlayerMessage.PLAYER_READY : PlayerMessage.PLAYER_NOT_READY
        socket.emit(EventTypes.playerMessage, {playerId: socket.id, message: message})

    }
  return (
    <>
      <Button onClick={ handleClick }> { ready ? 'Ready' : 'Send Ready'}</Button>
    </>
  );
}