const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      unique: true,
      lowercase: true,
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["admin", "cashier"],
      default: "cashier",
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
      minlength: 6,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.matchPassword = async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
