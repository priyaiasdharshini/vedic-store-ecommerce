import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/Category';
import ProductPage from './pages/Product';
import About from './pages/About';
import Contact from './pages/Contact';
import Account from './pages/Account';
import Authentication from './pages/Authentication'
import RefundPolicy from './pages/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsandConditions from './pages/TermsandConditions';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import Checkout from "./components/Checkout";
import ProtectedRoute from './components/ProtectedRoute';
import BlogSection from './components/BlogSection';
import BlogDetails from './pages/BlogDetails';

import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import { TestimonialProvider } from "./contexts/Testimonialcontext";
import { ProductVariantProvider } from "./contexts/ProductvariantContext";
import ProductDetailPage from "./pages/ProductDetailPage";
import Cart from './components/Cart';

function App() {
  return (
 <ProductVariantProvider>
   <ProductProvider>
    <TestimonialProvider>
     <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/auth" element={<Authentication />} />
              <Route path="/" element={<Home />} />
              <Route path="/category/:categorySlug" element={<CategoryPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/blogs" element={<BlogSection />} />
              <Route path='/cart' element={<Cart />} />
              <Route path="/blogs/:slug" element={<BlogDetails />} />

              {/* Protected Routes */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />

              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/refundpolicy" element={<RefundPolicy />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/termsandconditions" element={<TermsandConditions />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
    </TestimonialProvider>
   </ProductProvider>
    </ProductVariantProvider>
  );
}

export default App;