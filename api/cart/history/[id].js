// api/cart//USERID/count
import { pool } from "../../../_db.js";

// ✅ Delete a ticket from history
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { id } = req.query;
            await pool.query("DELETE FROM tickets WHERE id = $1", [id]);
            res.sendStatus(200);
        } catch (err) {
            console.error("History Delete Error:", err);
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
