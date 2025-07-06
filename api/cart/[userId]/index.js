// api/cart/[userId]/index.js
import { pool } from "../../../_db.js";

// ✅ Get grouped cart
export default async function handler(req, res) {
    const { userId } = req.query;

    try {
        const result = await pool.query(
            `SELECT MIN(id) as id, artist_name, price, ticket_type, SUM(quantity) as quantity
             FROM cart
             WHERE user_id = $1
             GROUP BY artist_name, price, ticket_type`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Get Cart Error:", err);
        res.status(500).json({ error: err.message });
    }
}
