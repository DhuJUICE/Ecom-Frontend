import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/pageComponents/CartPage/cart-context";
import ScrollToTop from "./components/scrollComponents/scrollToTop";

// Importing your components
import Cart from "./components/pageComponents/CartPage/cart";
import Checkout from "./components/pageComponents/CheckoutPage/checkout";
import PaymentSuccessPage from "./components/pageComponents/CheckoutPage/PaymentSuccess";
import Contact from "./components/pageComponents/ContactPage/contact";
import Menu from "./components/pageComponents/MenuPage/menu";
import Sign_In from "./components/userManagementComponents/sign-in";
import Sign_Up from "./components/userManagementComponents/sign-up";

import Header from './components/sectionComponents/header';
import Footer from './components/sectionComponents/footer';

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
              <Route path="/success" element={<PaymentSuccessPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/sign-in" element={<Sign_In />} />
              <Route path="/sign-up" element={<Sign_Up />} />
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
