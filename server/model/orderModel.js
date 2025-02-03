const { db } = require("../config/db.js");

const orderSchema = new db.Schema(
  {
    userId: { type: db.Schema.Types.ObjectId, ref: "users", required: true },
    items: [
      {
        itemId: { type: db.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true, min: 1 },
        type: {
          type: String,
          enum: ["MainCourse", "Starter", "Beverage"],
          required: true,
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    expiredAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 60 * 1000),
    },
  },
  { timestamps: true }
);

const Order = db.model("orders", orderSchema);
module.exports = { Order };
