import React, { useState } from 'react'
import '../../assets/css/garderner.css'
import GardenerHomeNav from '../../components/GardenerHomeNav'

const users = ['Ravi Kumar', 'Priya Sharma', 'Arun Das']

const messagesMock = [
  { sender: 'Ravi Kumar', text: 'Hi! When should I water the plants?', isMe: false },
  { sender: 'You', text: 'Morning is best for watering 🌿', isMe: true },
  { sender: 'Ravi Kumar', text: 'Got it, thanks!', isMe: false },
]

function ChatPage() {
  const [messages, setMessages] = useState(messagesMock)
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (newMessage.trim() === '') return
    setMessages([...messages, { sender: 'You', text: newMessage, isMe: true }])
    setNewMessage('')
  }

  return (
    <div className="chat-container">
        <GardenerHomeNav/>
      <div className="chat-sidebar mt-5">
        <h4>👥 Gardeners</h4>
        <ul className="user-list">
          {users.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      </div>

      <div className="chat-main mt-5">
        <div className="chat-header bg-success text-white">
          <h5>💬 Chat with Ravi Kumar</h5>
        </div>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble ${msg.isMe ? 'me' : 'other'}`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="chat-input-box">
          <input
            type="text"
            placeholder="Type your message..."
            className="form-control"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="btn btn-success ms-2" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
