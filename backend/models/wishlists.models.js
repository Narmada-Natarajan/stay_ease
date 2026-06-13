import mongoose from "mongoose";

const wishSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },
    },
    { timestamps: true }
);

export const wish= mongoose.model("Wish",wishSchema);
