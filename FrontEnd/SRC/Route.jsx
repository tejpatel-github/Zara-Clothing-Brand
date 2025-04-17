import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Register from "./Components/signup.jsx";
import AdminLogin from "./Components/Admin/AdminLogin.jsx";
import AdminDashboard from "./Components/Admin/AsminDash.jsx";
import Product from "./Components/Product.jsx";
import AdminManage from "./Components/Admin/AdminManage.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";
import AdminProduct from "./Components/Admin/AdminProduct.jsx";
import UpdateItem from "./Components/Admin/UpdateItem.jsx";
import ReturnOrderPage from "./Components/Admin/AdminReturn.jsx";
import Cart from "./Components/Cart.jsx";
import Wishlist from "./Components/wishlist.jsx";
import Order from "./Components/Order.jsx";
import Checkout from "./Components/Checkout.jsx";



const NotFound = () => <h1>Error 404!</h1>; 

function LinksSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Register />} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/Store" element={<Product />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element= {<Wishlist/>} />
        <Route path="/Order" element={<Order/>} />
        <Route path="/checkout" element={<Checkout/>} />


        {/* Admin side Route */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/adminmanage" element={<AdminManage />} />
        <Route path="/adminproduct" element={<AdminProduct/>} />
        <Route path="/updateItem" element={<UpdateItem/>} />
        <Route path="/adminreturn" element={<ReturnOrderPage/>} />






        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default LinksSetup;
