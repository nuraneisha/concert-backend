// api/cart//USERID/count
import { pool } from "../../../_db.js";

// ✅ Get ticket history
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { userId } = req.query;
            const result = await pool.query(
                "SELECT * FROM tickets WHERE user_id = $1 ORDER BY concert_date DESC",
                [userId]
            );
            res.json(result.rows);
        } catch (err) {
            console.error("History Get Error:", err);
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
