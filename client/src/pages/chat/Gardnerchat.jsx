// src/pages/Gardener/Gardnerchat.jsx

import React, { useState, useEffect } from 'react'
import '../../assets/css/garderner.css'
import GardenerHomeNav from '../../components/GardenerHomeNav'
import axios from '../../BaseAPI/axiosInstance'

function Gardnerchat() {
  const [plotList, setPlotList] = useState([])
  const [selectedPlotId, setSelectedPlotId] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const userId = localStorage.getItem("gardenerId") // gardener ID
  const userType = "users"

  // ✅ Fetch gardener's plots
  useEffect(() => {
    const fetchPlots = async () => {

    

      try {
        const res = await axios.get(`/gardener/${userId}`) // Adjust route as per backend
        setPlotList(res.data.data)
        if (res.data.plots.length > 0) {
          const firstPlotId = res.data.plots[0]._id
          setSelectedPlotId(firstPlotId)
          localStorage.setItem("plotId", firstPlotId)
        }
      } catch (error) {
        console.error("Error fetching plots", error)
      }
    }

    fetchPlots()
  }, [userId])

  // ✅ Fetch messages when a plot is selected
  useEffect(() => {
    if (selectedPlotId) {
      fetchMessages(selectedPlotId)
    }
  }, [selectedPlotId])

  const fetchMessages = async (plotId) => {
    try {
      const res = await axios.get(`/getmessage/${plotId}`)
      const mappedMessages = res.data.messages.map((msg) => ({
        sender: msg.senderId?.fullName || "Unknown",
        text: msg.message,
        isMe: msg.senderId?._id === userId,
      }))
      setMessages(mappedMessages)
    } catch (error) {
      console.error("Failed to load messages", error)
    }
  }

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedPlotId) return

    try {
      await axios.post('/message/send', {
        plotId: selectedPlotId,
        senderId: userId,
        senderModel: userType,
        message: newMessage,
      })

      setMessages([...messages, {
        sender: "You",
        text: newMessage,
        isMe: true,
      }])
      setNewMessage('')
    } catch (error) {
      console.error("Error sending message", error)
    }
  }

  return (
    <div className="chat-container">
      <GardenerHomeNav />

      <div className="chat-sidebar mt-5">
        <h5 className="text-center">🌱 Your Plots</h5>
        <ul className="list-group">
          {plotList.map((plot) => (
            <li
              key={plot._id}
              className={`list-group-item ${selectedPlotId === plot._id ? 'active' : ''}`}
              onClick={() => {
                setSelectedPlotId(plot._id)
                localStorage.setItem("plotId", plot._id)
              }}
              style={{ cursor: "pointer" }}
            >
              {plot.plotName || "Plot"}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-main mt-5">
        <div className="chat-header bg-success text-white">
          <h5>💬 Chat with Manager</h5>
        </div>

        <div className="chat-body">
          {messages.length === 0 ? (
            <p className="text-center text-muted">No messages yet.</p>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.isMe ? 'me' : 'other'}`}>
                <p>{msg.text}</p>
              </div>
            ))
          )}
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
          <button className="btn btn-success ms-2" onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Gardnerchat
