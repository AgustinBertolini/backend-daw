const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  createdAt: { type: Date, default: Date.now, expires: 7200 }, // 2 horas
});

module.exports = mongoose.model("AuthToken", tokenSchema);
