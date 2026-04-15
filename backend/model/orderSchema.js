import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Book", // or Product
                    required: true,
                },
                name: String,
                price: Number,
                quantity: {
                    type: Number,
                    default: 1,
                },
                image: String,
            },
        ],

        address: {
            name: String,
            phone: String,
            address: String,
            city: String,
            pincode: String,
        },

        totalAmount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered"],
            default: "pending",
        },

        paymentMethod: {
            type: String,
            default: "COD",
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);