import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Profile() {
    const { currentUser } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (currentUser) {
                try {
                    const res = await fetch(`http://localhost:3001/history/${currentUser.uid}`);
                    console.log(`${currentUser.uid}`)
                    const data = await res.json();
                    setTickets(Array.isArray(data) ? data : []);
                } catch (err) {
                    console.error("Error fetching ticket history:", err);
                    setTickets([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchHistory();
    }, [currentUser]);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/history/${id}`, { method: "DELETE" });
            setTickets(tickets.filter(ticket => ticket.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    if (loading) return <div className="container mt-4">Loading tickets...</div>;

    return (
        <div className="container mt-4">
            <h2>Your Tickets</h2>
            {tickets.length === 0 ? (
                <p>No tickets yet. Go back to the <a href="/">dashboard</a> to buy tickets.</p>
            ) : (
                <ul className="list-group">
                    {tickets.map((ticket) => (
                        <li key={ticket.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{ticket.artist_name}</strong><br />
                                {ticket.ticket_type} | RM{ticket.price}<br />
                                {new Date(ticket.concert_date).toLocaleDateString()}
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(ticket.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
