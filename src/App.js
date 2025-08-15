import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cart-context";
import ScrollToTop from "./components/scrollToTop";

// Importing your components
import Home from "./components/home";
import About from "./components/about";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import Contact from "./components/contact";
import Menu from "./components/menu";
import Sign_In from "./components/userManagementComponents/sign-in";
import Sign_Up from "./components/userManagementComponents/sign-up";
import UploadProduct from "./components/upload-products";
import "./App.css";
import Header from './components/sectionComponents/header';
import Footer from './components/sectionComponents/footer';
import ModerateProduct from './components/moderation-page';
import OwnerManageProducts from './components/owner-mgmt-page';
import BusinessOwnerUsers from './components/business-owner-page';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <div className="header">
            <Header />
          </div>

          <div className="body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/sign-in" element={<Sign_In />} />
              <Route path="/sign-up" element={<Sign_Up />} />
              <Route path="/upload-product" element={<UploadProduct />} />
              <Route path="/moderate-product" element={<ModerateProduct />} />
              <Route path="/owner-mgmt-product" element={<OwnerManageProducts />} />
              <Route path="/business-owners" element={<BusinessOwnerUsers />} />
            </Routes>
          </div>

          <div className="footer">
            <Footer />
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
