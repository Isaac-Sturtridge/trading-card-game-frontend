const GameStart = ({setHasStarted})=>{
    return(<button onClick={()=>{setHasStarted(true)}}>Start!</button>)
}

export default GameStart