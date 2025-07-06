// api/cart/index.js
import { pool } from "../_db.js";

// ✅ Add ticket to cart with quantity = 1
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { userId, artistName, price, ticketType } = req.body;
            await pool.query(
                "INSERT INTO cart(user_id, artist_name, price, ticket_type, quantity) VALUES ($1, $2, $3, $4, $5)",
                [userId, artistName, price, ticketType, 1]
            );
            res.status(200).json({ success: true });
        } catch (err) {
            console.error("Add Ticket Error:", err);
            res.status(500).json({ error: "Database error" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
