const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");

const dotenv = require("dotenv");
dotenv.config();
const { connectDatabase } = require("./config/db");

const PORT = process.env.PORT;
async function startServer() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
