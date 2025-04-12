import React from 'react'
import '../../assets/css/garderner.css'
import GardenerHomeNav from '../../components/GardenerHomeNav'

const events = [
    {
        id: 1,
        title: 'Organic Gardening Workshop',
        date: 'April 20, 2025',
        time: '10:00 AM - 1:00 PM',
        location: 'Green Community Center, Trivandrum',
        image: '/event1.jpg',
        description: 'Join us for a hands-on workshop to learn the basics of organic gardening. Beginners welcome!',
        organizer: 'Community Garden Team',
    },
    {
        id: 2,
        title: 'Seed Exchange & Awareness Meetup',
        date: 'May 5, 2025',
        time: '2:00 PM - 5:00 PM',
        location: 'Urban Garden Plot 3, Kochi',
        image: '/event2.jpg',
        description: 'Bring your seeds, plants, or cuttings and exchange with fellow gardeners. Let’s grow together!',
        organizer: 'EcoSwap Community Volunteers',
    }
]

const EventView = () => {
    return (
        <div>
            <GardenerHomeNav/>
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

export default EventView
