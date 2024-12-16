import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        discountPercentage: {
            type: Number,
            required: true,
            min:0,
            max:100,
        },//
        expirationDate: {
            type: Date,
            required: true,
        },//thoi gian het han
        isActive: {
            type: Boolean,
            default: true,
        },//active or not
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },//foreign key
    },
    {
        timestamps: true,
    }
);

export const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;