import React, { useEffect, useRef } from "react";

const MessagingArea = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messaging-container">
      <h2>Move history</h2>
      <div className="messagingArea">
        {messages.map((message) => {
          return <p>{message}</p>;
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagingArea;
