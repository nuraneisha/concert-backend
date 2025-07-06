import { Navbar, Nav, Container, Image } from "react-bootstrap";
import "../assets/styles/footer.css";
import logo from "../assets/images/logo.png";

export default function Footer() {
    return (
        <Navbar
            style={{
                position: "relative",
                bottom: 0,
                width: "100%",
            }}
            className="d-flex justify-content-end flex-column Footer text-light"
        >
            <h4 className="my-3 text-center">
                Never miss another show. Explore upcoming concerts, festivals, and live music events with Lunachella
            </h4>

            <div className="my-3 d-flex justify-content-evenly w-100" style={{ fontSize: "20px", fontWeight: "bold" }}>
                <Nav.Link className="footer-link">About</Nav.Link>
                <Nav.Link className="footer-link">Plan</Nav.Link>
                <Nav.Link className="footer-link">Help</Nav.Link>
                <Nav.Link className="footer-link">Help</Nav.Link>
            </div>

            <Navbar.Brand className="m-0 p-0 d-flex flex-row align-items-center">
                <Image
                    src={logo}
                    alt="Lunachella Logo"
                    style={{ width: "150px", cursor: "pointer" }}
                />
                <div className="ms-5 d-flex flex-column text-light">
                    <p className="m-0">&copy; Copyright 2025 Lunachella, LLC</p>
                    <p className="m-0">Terms of Use | Privacy Policy | Cookie Policy</p>
                </div>
                <div className="ms-5 d-flex justify-content-between" style={{ fontSize: "30px", gap: "15px" }}>
                    <i className="bi bi-facebook footer-icon"></i>
                    <i className="bi bi-twitter footer-icon"></i>
                    <i className="bi bi-discord footer-icon"></i>
                    <i className="bi bi-instagram footer-icon"></i>
                </div>
            </Navbar.Brand>
        </Navbar>
    );
}
