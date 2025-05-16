import React, { useEffect, useState } from 'react';
import '../../assets/css/garderner.css';
import GardenerHomeNav from '../../components/GardenerHomeNav';
import axiosInstance from '../../BaseAPI/axiosInstance';
import { Button, Alert, Spinner } from 'react-bootstrap';

const EventView = ({url}) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const userId = localStorage.getItem("gardenerId"); // Make sure this is stored during login

    // Fetch events on component mount
    const fetchEvents = async () => {
        try {
            const res = await axiosInstance.get("/event/upcoming");
            setEvents(res.data);
        } catch (err) {
            console.error("Error fetching events", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Register for event
    const handleRegister = async (eventId) => {
        try {
            const res = await axiosInstance.post(`/event/register/${eventId}`, { userId });
            alert(res.data.message || "Registered successfully!");
        } catch (err) {
            console.error("Registration error", err);
            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                setMessage("Error registering for the event.");
            }
        }

        // Remove message after a few seconds
        setTimeout(() => setMessage(''), 4000);
    };

    return (
        <div>
            <GardenerHomeNav />
            <div className="container mt-5 pt-4">
                <h2 className="text-success text-center mb-4">🌿 Upcoming Events</h2>

                {message && <Alert variant="info" className="text-center">{message}</Alert>}

                {loading ? (
                    <div className="text-center"><Spinner animation="border" /></div>
                ) : (
                    <div className="row">
                        {events.length > 0 ? (
                            events.map((event) => (
                                <div key={event._id} className="col-md-4 mb-4">
                                    <div className="card shadow-sm h-100 event-card">
                                        <img style={{height:"250px"}} src={`${url}/${event.image.filename}`} className="card-img-top" alt={event.title} />
                                        <div className="card-body">
                                            <h5 className="card-title">{event.eventName}</h5>
                                            <p className="card-text">{event.description}</p>
                                            <ul className="list-unstyled mb-2">
                                                <li><strong>📅 Date:</strong> {event.startDate?.slice(0, 10)}</li>
                                                <li><strong>⏰ Time:</strong> {event.time || "Not specified"}</li>
                                                <li><strong>📍 Location:</strong> {event.venue}</li>
                                                <li><strong>👤 Organizer:</strong> {event.organizer || "Community Team"}</li>
                                            </ul>
                                            <Button variant="outline-success" onClick={() => handleRegister(event._id)}>Register</Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted">No upcoming events available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventView;
