export const TableCard = () => {



    return (<button onClick={()=> {
        socket.emit("addCardToHand")
    }}></button>)
}