// Tickets.jsx
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Tickets() {
    const { name } = useParams(); // artist name
    const { currentUser } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    const handlePurchase = async (type, price) => {
        if (!currentUser) return setMessage("Please log in first");

        const body = {
            userId: currentUser.uid,
            artistName: name,
            ticketType: type,
            price,
        };

        const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            setMessage("Ticket added to cart!");
        } else {
            setMessage("Failed to add ticket.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Tickets for {name}</h2>
            <div className="d-flex flex-column gap-3">
                <button onClick={() => handlePurchase("Platinum", 1500)}>🎫 Platinum - RM1500</button>
                <button onClick={() => handlePurchase("Gold", 1000)}>🥈 Gold - RM1000</button>
                <button onClick={() => handlePurchase("Silver", 500)}>🥉 Silver - RM500</button>
            </div>
            <p className="mt-3">{message}</p>
        </div>
    );
}
