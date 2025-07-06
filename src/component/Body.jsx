import { Container, Row, Col } from "react-bootstrap";
import Cards from "./Cards";
export default function Body({ onPurchase }) {
    return (
        <Container className="mt-4 " style={{ paddingBottom: "250px" }} fluid>

            {/* Slideshow section - no columns needed */}
            <div className="mb-5 w-100">
                <Row>
                    <Col sm={3} className="d-flex flex-column align-items-start">

                        <span style={{
                            color: "#F472B6",
                            fontWeight: "bold",
                            fontSize: "25px",
                            marginBottom: "10px"
                        }}>
                            Press Play to enjoy the vibe
                        </span>


                        <iframe
                            src="https://open.spotify.com/embed/playlist/4BSj7IwrHLRpZeVNodMh5Z"
                            height="380"
                            width="100%"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    </Col>

                    <Col sm={9} style={{ backgroundColor: "black" }}>
                        <h1 style={{ color: "white", fontFamily: "Libertinus Math, system-ui", fontWeight: 400, fontSize: "80px", fontStyle: "normal", marginTop: "20px" }}>Concert & Events in Kuala Lumpur</h1>
                        <hr style={{ border: "4px solid #F472B6", width: "auto", margin: "30px 0" }} />
                        <div style={{ fontSize: "25px", color: "white", marginTop: "50px" }}>
                            <p>Get tickets to upcoming concerts,live shows,festivals, and events in Kuala Lumpur</p>
                            <p>Enjoy personalized concert recomendations and stay connected with your favourite artists.</p>
                            <p>Explore live music events near you,or browse by venue,artists and more</p>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Popular in KL - uses cards/columns */}
            <div className="mb-5">
                <h4>Concerts in KL</h4>
                <Cards onPurchase={onPurchase} />
            </div>

        </Container>
    );
}
