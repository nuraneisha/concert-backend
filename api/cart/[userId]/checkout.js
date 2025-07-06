// api/cart//USERID/count
import { pool } from "../../../_db.js";

// ✅ Get cart count
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { userId } = req.query;
            const cartResult = await pool.query(
                "SELECT artist_name, price, ticket_type, quantity FROM cart WHERE user_id = $1",
                [userId]
            );
            const cartItems = cartResult.rows;

            if (cartItems.length === 0) {
                return res.status(400).json({ error: "Cart is empty" });
            }

            for (let item of cartItems) {
                for (let i = 0; i < item.quantity; i++) {
                    await pool.query(
                        "INSERT INTO tickets(user_id, price, ticket_type, concert_date, artist_name) VALUES ($1, $2, $3, NOW(), $4)",
                        [userId, item.price.toString(), item.ticket_type, item.artist_name]
                    );
                }
            }

            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

            await pool.query("DELETE FROM cart WHERE user_id = $1", [userId]);

            res.json({ success: true, total });
        } catch (err) {
            console.error("Checkout Error:", err);
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
