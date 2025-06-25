import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cart-context";
import { Elements } from "@stripe/react-stripe-js"; // Importing Stripe Elements
import { loadStripe } from "@stripe/stripe-js"; // Stripe JS library
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
import Header from './components/sectionComponents/header'; // Import Header component
import Footer from './components/sectionComponents/footer'; // Import Footer component

// Load your Stripe public key
const stripePromise = loadStripe("pk_test_51Q7V6fP3W3PNlhUH4jkTVZDpXEN9S341jGJJyl2paPsPZEn8frJp4PKH0lyrzz3cE2gyThoKTlbjCCCENQvHgPye00CWjmk9L5");

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop /> {/* Ensures scrolling to top on route change */}
        <div className="App">
          <div className="header">
            <Header />
          </div>

          <div className="body">
            <Elements stripe={stripePromise}>
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
              </Routes>
            </Elements>
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
