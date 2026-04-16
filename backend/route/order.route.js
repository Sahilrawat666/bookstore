import express from "express";
import Order from "../model/orderSchema.js";
import User from "../model/user.model.js";
import { verifyToken } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { userId, items, address, total, mode } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = await Order.create({
            userId,
            items,
            address,
            totalAmount: total,
        });

        //  clear cart from user
        if (mode === "cart") {
            await User.findByIdAndUpdate(userId, {
                carts: [],
            });
        }

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Order failed" });
    }
});

// get user orders 

router.get("/profileOrders", verifyToken, async (req, res) => {
    try {
        const userId = req.user._id; // comes from token

        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
});

export default router;