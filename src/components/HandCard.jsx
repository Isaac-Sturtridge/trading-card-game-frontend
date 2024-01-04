import { socket } from "../socket"

export const HandCard = () => {



    return (<button onClick={()=> {
        socket.emit("sellCardFromHand")
    }}></button>)
}