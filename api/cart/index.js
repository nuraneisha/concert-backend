import { pool } from "../_db.js";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { userId, artistName, price, ticketType } = req.body;

        try {
            await pool.query(
                "INSERT INTO cart(user_id, artist_name, price, ticket_type, quantity) VALUES ($1, $2, $3, $4, 1)",
                [userId, artistName, price, ticketType]
            );
            return res.status(200).json({ success: true });
        } catch (err) {
            console.error("Add Ticket Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
