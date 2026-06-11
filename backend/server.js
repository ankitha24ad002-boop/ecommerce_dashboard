const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   PRODUCT - GET ALL
========================= */
app.get("/products", (req, res) => {
  db.query(
    "SELECT product_id, name, price, category_id, stock FROM Product",
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(result);
    }
  );
});

/* =========================
   PRODUCT - INSERT
========================= */
app.post("/products", (req, res) => {
  const { name, price, category_id, stock } = req.body;

  db.query(
    "INSERT INTO Product (name, price, category_id, stock) VALUES (?, ?, ?, ?)",
    [name, price, category_id, stock],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Product inserted successfully" });
    }
  );
});

/* =========================
   PRODUCT - UPDATE
========================= */
app.put("/products/:id", (req, res) => {
  const { price, stock } = req.body;

  db.query(
    "UPDATE Product SET price = ?, stock = ? WHERE product_id = ?",
    [price, stock, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Product updated successfully" });
    }
  );
});

/* =========================
   PRODUCT - DELETE
========================= */
app.delete("/products/:id", (req, res) => {
  db.query(
    "DELETE FROM Product WHERE product_id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Product deleted successfully" });
    }
  );
});

/* =========================
   CATEGORY FILTER
========================= */
app.get("/products/category/:id", (req, res) => {
  db.query(
    "SELECT * FROM Product WHERE category_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(result);
    }
  );
});

/* =========================
   ORDER INSERT (TRIGGER HANDLED IN SQL)
========================= */
app.post("/orders/simulate-trigger", (req, res) => {
  const { product_id, quantity, price } = req.body;

  const total = quantity * price;

  // STEP 1: Insert Order
  db.query(
    "INSERT INTO Orders (customer_id, order_date, total_amount) VALUES (1, NOW(), ?)",
    [total],
    (err, orderResult) => {
      if (err) return res.status(500).json({ message: err.message });

      const order_id = orderResult.insertId;

      // STEP 2: Insert OrderDetails
      db.query(
        "INSERT INTO OrderDetails (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [order_id, product_id, quantity, price],
        (err2) => {
          if (err2) return res.status(500).json({ message: err2.message });

          // IMPORTANT:
          // DO NOT update stock here (your SQL trigger handles it)

          res.json({
            message: "Order placed successfully (trigger executed in MySQL)"
          });
        }
      );
    }
  );
});

/* =========================
   SERVER START
========================= */
app.listen(process.env.PORT, () => {
  console.log("🚀 Server running on port", process.env.PORT);
});