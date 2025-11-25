// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./db-connect");
const Router = require("./routes/index");
// const PaymentRouter = require("./routes/PaymentRoutes");

const app = express();

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api", Router);
// app.use("/api/payment", PaymentRouter);

const path = require("path");

// Serve frontend build folder
app.use(express.static(path.join(__dirname, "dist")));
app.use("/public", express.static(path.join(__dirname, "public")));

// For SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// PORT FIX — URL mat daal, sirf number
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
