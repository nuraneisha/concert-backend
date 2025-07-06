// Login.jsx
import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";

export default function Login({ show, onHide }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formShow, setFormShow] = useState(false);
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = async (event) => {
        event.preventDefault();
        try {
            await signInWithPopup(auth, provider);
            onHide();
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoginEmail = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onHide();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            onHide();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton />
            <Modal.Body>
                <Button className="rounded-pill mb-2 w-100" variant="outline-dark">
                    <i className="bi bi-apple"></i> Sign in with Apple
                </Button>
                <Button
                    className="rounded-pill mb-2 w-100"
                    variant="outline-dark"
                    onClick={handleGoogleLogin}
                >
                    <i className="bi bi-google"></i> Sign in with Google
                </Button>
                <Button
                    className="rounded-pill mb-2 w-100"
                    variant="outline-dark"
                    onClick={() => {
                        setFormShow(true);
                        setIsSignUpMode(false);
                    }}
                >
                    <i className="bi bi-mail"></i> Sign in with Email
                </Button>
                <Button className="rounded-pill mb-3 w-100" variant="outline-dark">
                    <i className="bi bi-phone"></i> Sign in with Phone Number
                </Button>

                {formShow && (
                    <>
                        <Form
                            onSubmit={isSignUpMode ? handleSignUp : handleLoginEmail}
                            className="mt-3"
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="guest@gmail.com"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="1234567"
                                />
                            </Form.Group>

                            <Button variant="dark" type="submit" className="w-100 mb-2">
                                {isSignUpMode ? "Sign Up" : "Sign In"}
                            </Button>
                        </Form>

                        <p className="text-center" style={{ fontSize: "14px" }}>
                            {isSignUpMode ? (
                                <>
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => setIsSignUpMode(false)}
                                        style={{ color: "blue", cursor: "pointer" }}
                                    >
                                        Sign In
                                    </span>
                                </>
                            ) : (
                                <>
                                    Don’t have an account?{" "}
                                    <span
                                        onClick={() => setIsSignUpMode(true)}
                                        style={{ color: "blue", cursor: "pointer" }}
                                    >
                                        Sign Up
                                    </span>
                                </>
                            )}
                        </p>
                    </>
                )}

                {!formShow && (
                    <>
                        <p className="text-center mt-3">or</p>
                        <Button
                            className="rounded-pill w-100"
                            variant="dark"
                            onClick={() => {
                                setFormShow(true);
                                setIsSignUpMode(true);
                            }}
                        >
                            Create an account
                        </Button>
                        <p className="text-center mt-2" style={{ fontSize: "12px" }}>
                            By signing up, you agree to the Terms of Service and Privacy
                            Policy, including Cookie Use.
                        </p>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
}
