import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';
import { User, Search } from 'lucide-react';
import { useProduct } from '../contexts/ProductContext';

const Header = () => {
  const { cartItems } = useCart();
  const { getCategories, categories } = useProduct();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  const cartCount = cartItems ? cartItems.length : 0;
  const navigate = useNavigate();

  // ✅ Fetch categories from API on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        await getCategories();
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, [getCategories]);

  // ✅ Handle Search
  function handleSearch() {
    if (query.trim()) {
      navigate(`/category/${query.trim().toLowerCase()}`);
    }
  }

  return (
    <>
      <header className="bg-white text-black shadow-lg sticky top-0 z-40">
        <div className="max-w-[100rem] mx-auto px-4">
          <div className="flex justify-between items-center sm:py-4 pt-2 gap-2 ">
            {/* Logo + Brand */}
            <div className="flex   items-center gap-2">
              <Link to="/" className="flex items-center mr-5 space-x-2">
                <img
                  src="/logo-removebg-preview.png"
                  alt="AathiLife"
                  className="h-10 w-auto object-contain"
                />
                <span className="bg-black text-white px-3 py-1 rounded-full text-lg sm:text-xl font-Montserrat tracking-wide shadow-md">
                  AathiLife
                </span>
              </Link>

              {/* Desktop Menu */}
              <nav className="hidden md:flex space-x-6 ">
                <Link to="/" className="hover:text-[#f8b042] transition duration-300">
                  Home
                </Link>

                {/* ✅ Dynamic Categories Dropdown */}
                <div className="relative group">
                  <button className="hover:text-[#f8b042] transition duration-300">
                    Categories
                  </button>
                  <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-md mt-1 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.name.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-[#f8b042] first:rounded-t-md last:rounded-b-md"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link to="/about" className="hover:text-[#f8b042] transition duration-300">
                  About
                </Link>
                <Link to="/contact" className="hover:text-[#f8b042] transition duration-300">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Search Bar Desktop */}
            <div className="relative hidden bg-amber-100 rounded-sm sm:flex flex-row items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-2 py-0.5 md:py-2 md:px-4 rounded-md outline-none placeholder:text-sm"
                type="search"
                placeholder="Search for a Product..."
                list="items"
              />
              <button
                onClick={handleSearch}
                className="cursor-pointer bg-green-600 text-white p-1 md:p-2 rounded-r-sm"
              >
                <Search size={20} />
              </button>
              <datalist id="items">
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name.toLowerCase()} />
                ))}
              </datalist>
            </div>

            {/* User, Cart, Menu */}
            <div className="flex items-center space-x-4">
              <Link to="/account" className="hover:text-[#f8b042] transition duration-300">
                <User className="w-6 h-6" />
              </Link>

              <button
                onClick={() => navigate('/cart')}
                className="relative hover:text-[#f8b042] transition duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8-2M7 13l-1.8 2M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-amber-700 py-4">
              <nav className="space-y-2">
                <Link
                  to="/"
                  className="block py-2 hover:text-amber-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <div className="py-2">
                  <span className="block text-amber-200 font-semibold mb-2">Categories</span>
                  <div className="ml-4 space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.name.toLowerCase()}`}
                        className="block py-1 text-sm hover:text-amber-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link to="/about" className="block py-2 hover:text-amber-200" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link to="/contact" className="block py-2 hover:text-amber-200" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                <Link to="/account" className="block py-2 hover:text-amber-200" onClick={() => setIsMobileMenuOpen(false)}>My Account</Link>
              </nav>
            </div>
          )}

          {/* Search Bar Mobile */}
          {!isMobileMenuOpen && (
            <div className="relative bg-amber-50 rounded-sm flex flex-row flex-wrap items-center my-2 sm:hidden">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-2 py-0.5 rounded-md outline-none placeholder:text-sm flex-1"
                type="search"
                placeholder="Search for a Product..."
                list="items"
              />
              <button
                onClick={handleSearch}
                className="cursor-pointer bg-green-600 text-white p-1 rounded-r-sm absolute right-0"
              >
                <Search size={20} />
              </button>
              <datalist id="items">
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name.toLowerCase()} />
                ))}
              </datalist>
            </div>
          )}
        </div>
      </header>

      
    </>
  );
};

export default Header;
