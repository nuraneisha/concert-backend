import Layout from "../component/Layout";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ModalContext } from "../context/ModalContext";

export default function Dashboard() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <ModalContext.Provider value={{ showLoginModal, setShowLoginModal }}>
            <Layout />
            <Outlet />
            <Footer />
        </ModalContext.Provider>
    );
}
