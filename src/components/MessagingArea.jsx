const MessagingArea = ({messages}) => {
    return (
        <div className="messagingArea">
            {messages.map((message) => {
                <p>{message}</p>
            })}
        </div>
    )
}

export default MessagingArea;