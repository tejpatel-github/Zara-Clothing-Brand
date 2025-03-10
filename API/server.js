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
  "mongodb+srv://tpatel9817:Tsp%400852@cluster0.brcjm0n.mongodb.net/Zara"
);


app.use(express.json());
app.use(cors());

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