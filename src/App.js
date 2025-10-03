import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/pageComponents/CartPage/cart-context";
import ScrollToTop from "./components/scrollComponents/scrollToTop";

// Importing your components
import Cart from "./components/pageComponents/CartPage/cart";
import Checkout from "./components/pageComponents/CheckoutPage/checkout";
import Contact from "./components/pageComponents/ContactPage/contact";
import Menu from "./components/pageComponents/MenuPage/menu";
import Sign_In from "./components/userManagementComponents/sign-in";
import Sign_Up from "./components/userManagementComponents/sign-up";
import UploadProduct from "./components/pageComponents/UploadPage/upload-products";

import Header from './components/sectionComponents/header';
import Footer from './components/sectionComponents/footer';
import ModerateProduct from './components/pageComponents/ModeratePage/moderation-page';
import OwnerManageProducts from './components/pageComponents/OwnerManagementPage/owner-mgmt-page';
import BusinessOwnerUsers from './components/pageComponents/BusinessOwnerPage/business-owner-page';

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
              <Route path="/" element={<Menu />} />
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
