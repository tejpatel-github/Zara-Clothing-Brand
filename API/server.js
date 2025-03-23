const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { type } = require("os");
const bcrypt = require("bcryptjs");

const app = express();

mongoose.connect(
  ""
);


// app.use(express.json());


// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json({ limit: '10mb' }));

app.get("/", (req, res) => {
  res.send("Backend is working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Backend started on http://localhost:${PORT}`);
});


const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};


const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


app.post("/login", async (req, res) => {
  console.log("Login");
  let success = false;
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      console.log(user.id);
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success, token });
    } else {
      return res
        .status(400)
        .json({
          success: success,
          errors: "please try with correct email/password",
        });
    }
  } else {
    return res
      .status(400)
      .json({
        success: success,
        errors: "please try with correct email/password",
      });
  }
});


app.post("/signup", async (req, res) => {
  console.log("Sign Up");
  let success = false;

  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({
        success: success,
        errors: "existing user found with this email",
      });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  success = true;
  res.json({ success, token });
});



// Admin Side API
const Admin = mongoose.model("Admin", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


// Admin Login
app.post("/AdminLogin", async (req, res) => {
  console.log("Login");
  let success = false;
  let admin = await Admin.findOne({ email: req.body.email });
  
  if (admin) {
    // Compare hashed password
    const passCompare = await bcrypt.compare(req.body.password, admin.password);
    
    if (passCompare) {
      const data = {
        admin: {
          id: admin.id,
        },
      };
      success = true;
      console.log(admin.id);
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success, token });
    } else {
      return res.status(400).json({
        success: success,
        errors: "Incorrect email or password",
      });
    }
  } else {
    return res.status(400).json({
      success: success,
      errors: "No user found with this email",
    });
  }
});

// Admin Signup
app.post("/AdminSignup", async (req, res) => {
  console.log("Sign Up");
  let success = false;

  let check = await Admin.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: success,
      errors: "A user with this email already exists",
    });
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const admin = new Admin({
    name: req.body.username,
    email: req.body.email,
    password: hashedPassword, // Store hashed password
    cartData: cart,
  });

  await admin.save();

  const data = {
    admin: {
      id: admin.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  success = true;
  res.json({ success, token });
});




// Add to cart
const CartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: {type: String, required: true },
  quantity: { type: Number, required: true },
  email: { type: String, required: true },
  image: { type: Buffer },
  imageType: { type: String }
});


const CartItem = mongoose.model("CartItem", CartItemSchema);

app.get('/api/cart', async (req, res) => {
  const { email } = req.query;
  try {
    const cartItems = await CartItem.find({ email });
    res.status(200).json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.delete('/api/cart', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await CartItem.deleteMany({ email });
    res.status(200).json({ message: `${result.deletedCount} items deleted.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/api/cart", async (req, res) => {
  const { name, price, size, quantity, email, image, imageType } = req.body;
  try {
    const newCartItem = new CartItem({ name, price, quantity, size, email, image, imageType });
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});




app.put("/api/cart/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const updatedItem = await CartItem.findByIdAndUpdate(id, { quantity }, { new: true });
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



app.delete("/api/cart/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await CartItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.get('/user/:email', async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
    console.log("Error fetching user:", error);
  }
});



app.delete('/api/cart', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  try {
    // Delete all cart items for the specified email
    const result = await Cart.deleteMany({ email });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'No cart items found for this user' });
    }

    res.status(200).send({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error); // Log error for debugging
    res.status(500).send({ message: 'Failed to clear cart' });
  }
});



// wishlist
const wishlistItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: {type: String, required: true },
  quantity: { type: Number, required: true },
  email: { type: String, required: true },
  image: { type: Buffer },
  imageType: { type: String }
});


const wishlistItem = mongoose.model("wishlistItem", wishlistItemSchema);

app.get('/api/wishlist', async (req, res) => {
  const { email } = req.query;
  try {
    const wishlistItems = await wishlistItem.find({ email });
    res.status(200).json(wishlistItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



app.delete('/api/wishlist', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await wishlistItem.deleteMany({ email });
    res.status(200).json({ message: `${result.deletedCount} items deleted.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/api/wishlist", async (req, res) => {
  const { name, price, size, quantity, email, image, imageType } = req.body;
  try {
    const newWishlistItem = new wishlistItem({ name, price, quantity, size, email, image, imageType });
    await newWishlistItem.save();
    res.status(201).json(newWishlistItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});





app.put("/api/wishlist/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const updatedItem = await wishlistItem.findByIdAndUpdate(id, { quantity }, { new: true });
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



app.delete('/api/wishlist/:id', async (req, res) => {
  try {
    const result = await wishlistItem.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.get('/user/:email', async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
    console.log("Error fetching user:", error);
  }
});
