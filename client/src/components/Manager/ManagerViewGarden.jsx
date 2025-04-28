import React from 'react'
import { Card, Row, Col, Badge } from 'react-bootstrap';
import "../../assets/css/GardenStyling.css";
import ManagerHomeNav from './ManagerHomeNav';
function ManagerViewGarden() {
    const items = [
        {
          id: 1,
          name: "Garden Rose Plant",
          category: "plants",
          price: 29.99,
          quantity: 15,
          description: "Beautiful garden rose plant, perfect for your garden",
          image: "/images/garden-rose.jpg"
        },
        // Add more items as needed
      ];
    
  return (
    <div>
    <ManagerHomeNav/>
          <div className="view-items-container">
      <h2 className=" headding-div text-center mb-4">Available Items</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {items.map((item) => (
          <Col key={item.id}>
            <Card className="item-card">
              <div className="item-image-container">
                <Card.Img 
                  variant="top" 
                  src={item.image} 
                  className="item-image"
                />
                <Badge className="category-badge">
                  {item.category}
                </Badge>
              </div>
              <Card.Body>
                <div className="item-header">
                  <Card.Title>{item.name}</Card.Title>
                  <span className="price">${item.price}</span>
                </div>
                <Card.Text className="description">
                  {item.description}
                </Card.Text>
                <div className="item-footer">
                  <Badge 
                    bg={item.quantity > 0 ? "success" : "danger"}
                    className="stock-badge"
                  >
                    {item.quantity > 0 ? `In Stock: ${item.quantity}` : "Out of Stock"}
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>

    </div>
  )
}

export default ManagerViewGarden
