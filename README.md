# E-Commerce Management System (Full Stack + MySQL + Triggers)

##  Project Description
This is a full-stack E-Commerce Management System built using:
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Database: MySQL (ECOMMERCEDB)
- Advanced Feature: MySQL Triggers

---

##  Database Design

### Tables:
- Customer
- Category
- Product
- Orders
- OrderDetails
- Payment

 Full schema available in `database.sql`

---

##  Features

- Add / Update / Delete Products
- View Product List
- Place Orders
- Automatic Stock Update using MySQL Trigger
- Category filtering
- Order simulation system

---

##  Trigger Functionality

When an order is placed:
- A row is inserted into `OrderDetails`
- MySQL trigger automatically reduces product stock
  
 Trigger code in `triggers.sql`

---

## 🚀 How to Run Project

### 1. Setup Database
Run:
