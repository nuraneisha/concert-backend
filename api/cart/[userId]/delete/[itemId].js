// api/cart/[userId]/delete/[itemId].js
import { pool } from "../../../../_db.js";

export default async function handler(req, res) {
    const { userId, itemId } = req.query;

    if (req.method === "DELETE") {
        try {
            await pool.query("DELETE FROM cart WHERE id = $1 AND user_id = $2", [itemId, userId]);

            const updated = await pool.query(
                `SELECT MIN(id) as id, artist_name, price, ticket_type, SUM(quantity) as quantity
                 FROM cart
                 WHERE user_id = $1
                 GROUP BY artist_name, price, ticket_type`,
                [userId]
            );

            res.json(updated.rows);
        } catch (err) {
            console.error("Delete Error:", err);
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
