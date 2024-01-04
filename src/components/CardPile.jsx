import { socket } from "../socket"

export const CardPile = () => {
    return (
        <>
        <button onClick={() => {
            socket.emit("addCardToHand")
        }}>Card Pile</button>
        </>
    )
}

