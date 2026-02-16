const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_SG54KSI2Pb6QzN",
  key_secret: "hpvzN2k9y4P2NjWaqx77LOeA",
});

// Root route (for testing server)
app.get("/", (req, res) => {
  res.send("Payment backend is running successfully ✅");
});

// Create order route
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: amount, // amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Render required PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
