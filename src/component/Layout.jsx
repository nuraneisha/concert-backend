import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth"; // ✅ Import signOut
import logo from "../assets/images/logo.png";
import Login from "../pages/LogIn";
import { ModalContext } from "../context/ModalContext";
import "../assets/styles/layout.css";

export default function Layout() {
    const { currentUser } = useContext(AuthContext);
    const { cartCount, setCartCount } = useContext(CartContext);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartCount = async () => {
            if (currentUser) {
                try {
                    const res = await fetch(`/api/cart/${currentUser.uid}/count`);
                    const data = await res.json();
                    setCartCount(data.count || 0);
                } catch (error) {
                    console.error("Error fetching cart count:", error);
                }
            } else {
                setCartCount(0);
            }
        };

        fetchCartCount();
    }, [currentUser, setCartCount]);

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            navigate("/"); // Optional: redirect to home
        } catch (error) {
            console.error("Sign-out failed:", error);
        }
    };

    return (
        <ModalContext.Provider value={{ showLoginModal, setShowLoginModal }}>
            <Navbar className="lunachella-navbar" expand="lg">
                <Container>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        <img src={logo} alt="Logo" style={{ width: 150 }} />
                    </Navbar.Brand>

                    <Nav className="ms-auto">
                        <Nav.Link onClick={() => navigate("/venue")}>
                            <i className="bi bi-geo-alt-fill me-2"></i>Venue
                        </Nav.Link>

                        {!currentUser ? (
                            <Nav.Link onClick={() => setShowLoginModal(true)}>
                                <i className="bi bi-person-fill-lock me-2"></i>Log In
                            </Nav.Link>
                        ) : (
                            <>
                                <Nav.Link onClick={() => navigate("/cart")}>
                                    <i className="bi bi-cart-fill me-2"></i>
                                    Cart ({cartCount})
                                </Nav.Link>
                                <Nav.Link onClick={() => navigate("/profile")}>
                                    <i className="bi bi-person-circle me-2"></i>Profile
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            <Login show={showLoginModal} onHide={() => setShowLoginModal(false)} />
        </ModalContext.Provider>
    );
}
