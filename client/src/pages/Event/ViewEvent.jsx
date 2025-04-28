import React from 'react'
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import "../../assets/css/EventView.css";
import ManagerHomeNav from '../../components/Manager/ManagerHomeNav';

function ViewEvent() {
    const events = [
        {
        id: 1,
        eventName: "Community Gardening Day",
        date: "2023-10-15",
        time: "10:00 AM - 2:00 PM",
        location: "Central Park",
        category: "Gardening",
        description: "Join us for a day of gardening and community bonding.",
        maxSeats: 50,
        registeredSeats: 30,
        image: "/images/community-gardening.jpg"
        },
        // Add more events as needed
    ];
    
  return (
    <div>
    <ManagerHomeNav/>
                <div className="container mt-5 pt-4">
                <h2 className="text-success text-center mb-4">🌿 Upcoming Events</h2>
                <div className="row">
                    {events.map((event) => (
                        <div key={event.id} className="col-md-6 mb-4">
                            <div className="card shadow-sm h-100 event-card">
                                <img src={event.image} className="card-img-top" alt={event.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{event.title}</h5>
                                    <p className="card-text">{event.description}</p>
                                    <ul className="list-unstyled mb-2">
                                        <li><strong>📅 Date:</strong> {event.date}</li>
                                        <li><strong>⏰ Time:</strong> {event.time}</li>
                                        <li><strong>📍 Location:</strong> {event.location}</li>
                                        <li><strong>👤 Organizer:</strong> {event.organizer}</li>
                                    </ul>
                                    <button className="btn btn-outline-success">View More</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

    </div>
  )
}

export default ViewEvent
