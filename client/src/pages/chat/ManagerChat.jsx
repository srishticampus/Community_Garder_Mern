import React, { useState, useEffect } from "react";
import ManagerHomeNav from "../../components/Manager/ManagerHomeNav";
import "../../assets/css/ManagerCha.css";
import axios from "../../BaseAPI/axiosInstance";

function ManagerChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [plots, setPlots] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [show, setShow] = useState(false);
  const userId = localStorage.getItem("managerId");
  const userType = "managers";

  useEffect(() => {
    fetchPlots();
  }, []);

  const fetchPlots = async () => {
    try {
      const res = await axios.get(`/manager/${userId}`);
      setPlots(res.data.data);
    } catch (error) {
      console.error("Error fetching plots", error);
    }
  };

  const fetchMessages = async (plotId) => {
    try {
      const res = await axios.get(`/getmessage/${plotId}`);
      const mappedMessages = res.data.messages.map((msg) => ({
        sender: msg.senderId?.fullName || "Unknown",
        text: msg.message,
        isMe: msg.senderId?._id === userId,
      }));
      setMessages(mappedMessages);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedPlot) return;
    try {
      await axios.post("/message/send", {
        plotId: selectedPlot._id,
        senderId: userId,
        senderModel: userType,
        message: newMessage,
      });

      setMessages([...messages, {
        sender: "You",
        text: newMessage,
        isMe: true,
      }]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const handlePlotSelect = (plot) => {
    setSelectedPlot(plot);
    fetchMessages(plot._id);
  };

  return (
    <div className="chat-container">
      <ManagerHomeNav />
      <div className="chat-sidebar mt-5">
        <h4>🌾Your Plots</h4>
        <ul className="user-list"  onClick={()=>{setShow(true)}}>
          {plots.map((plot) => (
            <li key={plot._id} onClick={() => handlePlotSelect(plot)} className={selectedPlot?._id === plot._id ? "active" : ""}>
              <strong>{plot.plotName}</strong><br />
              {
                show==true ?  <div>
              Gardeners:
              <ul>
                {plot.assignedGardeners.map(g => (
                  <li key={g._id}>{g.fullName}</li>
                ))}
              </ul></div>:""
              }
             
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-main mt-5">
        <div className="chat-header bg-success text-white">
          <h5>💬 Chat with Gardeners</h5>
          {selectedPlot && <p>Plot: {selectedPlot.plotName}</p>}
        </div>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.isMe ? "me" : "other"}`}>
              <p>{msg.text}</p>
              <small>{msg.sender}</small>
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
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="btn btn-success ms-2" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagerChat;
