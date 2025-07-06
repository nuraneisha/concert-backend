// api/cart//USERID/count
import { pool } from "../../../_db.js";

// ✅ Get cart count
export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { userId } = req.query;
            const result = await pool.query(
                "SELECT COALESCE(SUM(quantity), 0) as count FROM cart WHERE user_id = $1",
                [userId]
            );
            res.json({ count: parseInt(result.rows[0].count, 10) });
        } catch (err) {
            console.error("Cart Count Error:", err);
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
