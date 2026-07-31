const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { connectDatabase } = require("../config/db.js");
dotenv.config();
const User = require("../models/User.js");
const Product = require("../models/Product.js");
const Customer = require("../models/Customer.js");

async function seed() {
  await connectDatabase();

  await User.deleteMany({});
  await Product.deleteMany({});
  await Customer.deleteMany({});

  await User.create({
    username: "admin",
    passwordHash: "admin123",
    role: "admin",
  });

  await User.create({
    username: "cashier",
    passwordHash: "cashier123",
    role: "cashier",
  });

  await Product.insertMany([
    {
      name: "ماسورة مياه",
      category: "مواسير",
      unit: "piece",
      purchasePrice: 80,
      sellingPrice: 120,
      stock: 100,
      minStock: 10,
    },
    {
      name: "كوع PVC",
      category: "وصلات",
      unit: "piece",
      purchasePrice: 15,
      sellingPrice: 25,
      stock: 50,
      minStock: 5,
    },
  ]);
  await Customer.create({
    name: "أحمد محمد",
    phone: "01000000000",
    type: "plumber",
  });
  console.log("Seed completed");
  process.exit(0);
}
seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
