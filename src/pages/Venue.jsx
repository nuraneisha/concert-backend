import { Container, Row, Card, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Venue() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/kuala-lumpur")
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json)) {
          setData(json);
        } else {
          console.warn("No data found");
        }
      })
      .catch((error) =>
        console.error("Error fetching concerts:", error.message)
      );
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        {data.map((item, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold" }}>{item.location}</Card.Title>
                <iframe
                  width="100%"
                  height="200"
                  frameBorder="0"
                  style={{ border: 0, borderRadius: "8px" }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(item.location)}&output=embed`}
                  allowFullScreen
                  title={`Map of ${item.location}`}
                ></iframe>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
