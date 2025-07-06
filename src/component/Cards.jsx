import { Row, Card, Col, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ModalContext } from "../context/ModalContext";
import { useNavigate } from "react-router-dom";
import "../assets/styles/cards.css"; // Make sure this is created

export default function Cards() {
    const [data, setData] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { setShowLoginModal } = useContext(ModalContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/scrapper")
            .then((response) => response.json())
            .then((json) => Array.isArray(json) && setData(json))
            .catch((error) => console.error("Error fetching:", error));
    }, []);

    const handleViewTickets = (item) => {
        if (currentUser) {
            navigate(`/tickets/${encodeURIComponent(item.name)}`);
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <>
            <Row className="mt-4">
                {data.map((item, index) => (
                    <Col key={index} md={4} className="mb-4">
                        <Card>
                            {item.image && (
                                <Card.Img variant="top" src={item.image} alt={item.name} />
                            )}
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>📍 {item.location}</Card.Text>
                                <Card.Text>📅 {item.date}</Card.Text>
                                <Button variant="primary" onClick={() => handleViewTickets(item)}>
                                    View Tickets
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}
