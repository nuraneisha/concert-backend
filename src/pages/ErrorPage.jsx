import { Container, Button } from "react-bootstrap";
import sadFace from "../assets/images/sad-face.jpg"
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    return (

        <Container className="my-5" style={{ backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center" }} >
            <div className="mb-3" style={{ display: "flex", flexDirection: "row" }}>
                <img src={sadFace} style={{ height: "100px", width: "100px" }} />
                <h1 style={{ fontSize: "80px", fontWeight: "1000" }}>404 Error </h1>
            </div>
            <h2 style={{ fontSize: "50px" }}>Ooops...page not found</h2>
            <p className="mt-4">We don't know how you ended up here, but you should go away now.</p>
            <Button variant="primary" onClick={() => navigate("/")}>Back To Landing Page</Button>
        </Container>

    )
}