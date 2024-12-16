import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },// nguoi dung lien ket voi don hang
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],//cac san pham trong don hang
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },//tong tien cua don hang
        stripeSessionId: {
            type: String,
            unique: true,
        },//id cua don hang tren stripe
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
        
