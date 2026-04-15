import express from "express";
import Order from "../model/orderSchema.js";
import User from "../model/user.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { userId, items, address, total } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = await Order.create({
            userId,
            items,
            address,
            totalAmount: total,
        });

        // 🔥 clear cart from user
        await User.findByIdAndUpdate(userId, {
            carts: [],
        });

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Order failed" });
    }
});

export default router;