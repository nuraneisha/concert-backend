import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Cart() {
    const { currentUser } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(null);

    // Fetch cart items on mount or user change
    useEffect(() => {
        if (currentUser) {
            fetch(`/api/cart/${currentUser.uid}`)
                .then(res => res.json())
                .then(data => {
                    setCartItems(data);
                    setTotal(null); // Reset total if user switches or refetches
                })
                .catch(console.error);
        }
    }, [currentUser]);

    // Update quantity
    const updateQuantity = async (itemId, newQty) => {
        if (newQty <= 0) {
            await deleteItem(itemId);
            return;
        }

        try {
            const res = await fetch(`/api/cart/${currentUser.uid}/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ itemId, quantity: newQty })
            });
            const data = await res.json();
            setCartItems(data);
        } catch (error) {
            console.error("Update quantity failed", error);
        }
    };

    // Delete item
    const deleteItem = async (itemId) => {
        try {
            const res = await fetch(`/api/cart/${currentUser.uid}/delete/${itemId}`, {
                method: "DELETE"
            });
            const data = await res.json();
            setCartItems(data);
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    // Checkout
    const handleCheckout = async () => {
        try {
            const res = await fetch(`/api/cart/${currentUser.uid}/checkout`, {
                method: "POST"
            });
            const data = await res.json();
            if (data.success) {
                setCartItems([]);
                setTotal(data.total);
            }
        } catch (err) {
            console.error("Checkout error", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Your Cart</h2>

            {cartItems.length === 0 && (
                <p>No tickets in cart.</p>
            )}

            <ul className="list-group mb-3">
                {cartItems.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            {item.artist_name} ({item.ticket_type})<br />
                            RM{item.price} x {item.quantity} = <strong>RM{item.price * item.quantity}</strong>
                        </div>
                        <div>
                            <button
                                className="btn btn-sm btn-outline-secondary me-1"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                                -
                            </button>
                            <button
                                className="btn btn-sm btn-outline-secondary me-2"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                +
                            </button>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => deleteItem(item.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {cartItems.length > 0 && (
                <button className="btn btn-dark" onClick={handleCheckout}>
                    Checkout
                </button>
            )}

            {total !== null && (
                <div className="alert alert-success mt-3">
                    Total Paid: <strong>RM{total}</strong>
                </div>
            )}
        </div>
    );
}
