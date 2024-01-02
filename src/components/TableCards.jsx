import { useState } from "react";
import { TableCard } from "./TableCard";

export const TableCards = ({setHandCards}) => {
    const [tableCards, setTableCards] = useState([])

    return (
        <>
        <h1>Table Cards</h1>
        {tableCards.map((card) => {
            <TableCard setHandCards={setHandCards} key={card}/>
        })}
        </>
    )
}