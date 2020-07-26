import React, { useState, useEffect } from 'react';
import { db } from '../firebaseauth.config'

const MessagePage = () => {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    listenForMessages();
  }, []);

  const listenForMessages = () => {
    db.collection('messages')
      .onSnapshot((snapshot) => {
        const allMessages = [];
        snapshot.forEach((doc) => allMessages.push(doc.data()));
        setMessages(allMessages);
      }, (error) => console.error(error));
  };

  if (!messages) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const renderMessages = () => {
    if (!messages.length) {
      return (
        <div>
          There's no messages yet...
        </div>
      )
    }

    return messages.map(({ name, message, email }, index) => (
      <div key={index}>
        <b>
          {name}, {email}
        </b>
        <div>
          {message}
        </div>
      </div>
    ));
  };

  return (
    <div className="home-container" style={{ width: '80%', margin: '0 auto' }}>
      {renderMessages()}
    </div>
  )
};

export default MessagePage;