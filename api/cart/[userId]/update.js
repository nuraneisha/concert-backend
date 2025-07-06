// api/cart//USERID/count
import { pool } from "../../../_db.js";

// ✅ Update quantity
export default async function handler(req, res) {
    if (req.method === "PUT") {
        try {
            const { userId } = req.query;
            const { itemId, quantity } = req.body;
            if (quantity <= 0) {
                await pool.query("DELETE FROM cart WHERE id = $1 AND user_id = $2", [itemId, userId]);
            } else {
                await pool.query("UPDATE cart SET quantity = $1 WHERE id = $2 AND user_id = $3", [quantity, itemId, userId]);
            }

            const updated = await pool.query(
                `SELECT MIN(id) as id, artist_name, price, ticket_type, SUM(quantity) as quantity
             FROM cart
             WHERE user_id = $1
             GROUP BY artist_name, price, ticket_type`,
                [userId]
            );
            res.json(updated.rows);
        } catch (err) {
            console.error("Update Error:", err);
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
