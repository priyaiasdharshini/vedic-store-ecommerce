// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import StoreFeatures from '../components/StoreFeatures';
import SpiritualBanner from '../components/SpiritualBanner';
import Sacredofferbar from '../components/Sacredofferbar';
import Spiritualkarungalishowcase from '../components/Karungalishowcase';
import Faq from '../components/Faq';
import DivineGallery from '../components/DivineGallery';
import Testimonials from '../components/Testimonials';
import ShippingFeatures from '../components/ShippingFeatures';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';
import BlogSection from '../components/BlogSection';
import { useProduct } from '../contexts/ProductContext';
import ProductCard from "../components/ProductCard";


const Home = () => {

  const{products, getProductsByCategory, getCategories}=useProduct()
  // const products = []
  console.log('home')

  useEffect(()=>{    
      console.log(products)
  },[products])
  
  useEffect(()=>{
    async function loadProducts() {
      await getCategories()
      await getProductsByCategory(1,10)
    }
    loadProducts()
  },[])

  const categories = [
    { name: 'KARUNGALI', slug: 'karungali' },
    { name: 'RUDRAKSHA', slug: 'rudraksha' },
    { name: 'GEMSTONE', slug: 'gemstone' },
    { name: 'SANDALWOOD', slug: 'sandalwood' },
    { name: 'RED SANDALWOOD', slug: 'red-sandalwood' },
    { name: 'MEN', slug: 'Men' },
    { name: 'WOMEN', slug: 'women' },
    { name: 'SILVER', slug: 'silver' },
    { name: 'DHARBHA MAT', slug: 'dharbha' },
    { name: 'BODY ESSENTIALS', slug: 'body-essentials' },   
    { name: 'VETTIVER', slug: 'vettiver' }
  ];

  const slides = [
  {
    image: "/spiritualshowcase/innerpeace.jpeg",
    title: "BLESSED WITH POOJA",
    description: "Every product is prayed and energised before delivery",
    link: "/category/karungali",
  },
  {
    image: "/spiritualshowcase/WhatsApp Image 2025-10-23 at 1.45.02 PM.jpeg",
    title: "SACRED WOOD",
    description: "100+ year old rare woods.",
    link: "/category/rudraksha",
  },
  {
    image: "/spiritualshowcase/innerpeace2.jpeg",
    title: "POSITIVE ENERGY",
    description: "Harness the power of nature",
    link: "/category/gemstone",
  },
   {
    image: "/divinelife/img14.webp",
    title: "SPIRITUAL TOUCH.",
    description: "It carries true spiritual energy",
    link: "/category/rudraksha",
  },
   {
    image: "/divinelife/img20.webp",
    title: "AUTHENTIC KARUNGALI.",
    description: "Trusted quality Mala & Bracelets",
    link: "/category/karungali",
  },
   {
    image: "/divinelife/img22.webp",
    title: "SANDALWOOD.",
    description: "100+ years old rare woods",
    link: "/category/sandalwood",
  },
];


const [currentIndex, setCurrentIndex] = useState(0);
const [searchTerm, setSearchTerm] = useState("");
const prevSlide = () => {
  setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
};

const nextSlide = () => {
  setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
};

// Auto-slide every 3s
// useEffect(() => {
//   const timer = setInterval(() => {
//     setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   }, 3000);
//   return () => clearInterval(timer);
// }, [slides.length]);

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* 🌟 Mobile Category List */}
<div className="bg-white shadow-sm sticky top-0 z-30 block sm:hidden">
  <div className="w-full px-3 py-2 overflow-x-auto no-scrollbar">
    <div className="flex space-x-3 whitespace-nowrap">
      {categories.map((category) => (
        <Link
          key={category.slug}
          to={`/category/${category.slug}`}
          className="text-xs text-black hover:text-[#f8b042] font-medium transition-colors border border-[#f8b042] px-3 py-1 rounded-full bg-white shadow-sm"
        >
          {category.name}
        </Link>
      ))}
    </div>
  </div>
</div>


<section className="px-2 sm:px-6 lg:px-12 my-4 overflow-hidden">
  <div
    className="flex gap-[2px] animate-marquee"
    style={{
      width: "max-content",
      animation: "marquee 25s linear infinite",
    }}
  >
    {[
      { name: "Karungali Bracelets", image: "/kar.jpeg", link: "/category/karungali" },
      { name: "German silver", image: "/silverplated.jpeg", link: "/category/uniques" },
      { name: "Copper karungali", image: "/copperr.jpeg", link: "/category/silver" },
         { name: "Pure silver 92.5", image: "/silverr.jpeg", link: "/category/uniques" },
      { name: "Impon karungali", image: "/imponee.png", link: "/category/silver" },
      { name: "Gold Plated", image: "/goldplated.jpeg", link: "/category/silver" },

      // duplicates for seamless loop
      { name: "Karungali", image: "/kar.jpeg", link: "/category/karungali" },
      { name: "German silver", image: "/silverplated.jpeg", link: "/category/uniques" },
      { name: "Copper karungali", image: "/copperr.jpeg", link: "/category/silver" },
        { name: "Pure silver 92.5", image: "/silverr.jpeg", link: "/category/uniques" },
      { name: "Impon karungali", image: "/imponee.png", link: "/category/silver" },
      { name: "Plated karungali", image: "/goldplated.jpeg", link: "/category/silver" },
    ].map((category, index) => (
      <Link
        to={category.link}
        key={index}
        className="flex flex-col items-center flex-shrink-0"
        style={{
          width: '25vw',            // 4 items on mobile
          maxWidth: '120px'         // slightly bigger on desktop
        }}
      >
        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="mt-0.5 text-[9px] sm:text-[11px] font-medium text-gray-700 leading-tight text-center truncate">
          {category.name}
        </span>
      </Link>
    ))}
  </div>

  <style>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}</style>
</section>

{/* Hero Banner Section */}
<section className="w-full relative overflow-hidden">
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {slides.map((slide, idx) => (
      <div
        key={idx}
        className="relative w-full flex-shrink-0 px-2 sm:px-4"
      >
        {/* Banner Image */}
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[360px] rounded-xl object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-10 lg:px-16 text-white">
          <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold drop-shadow-md">
            {slide.title}
          </h2>
      <p className="mt-2 inline-block bg-gradient-to-r from-amber-400 to-green-700 hover:from-green-500 hover:to-amber-600 
               px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-sm sm:text-base font-semibold shadow-lg text-white">
  {slide.description}
</p>


          {/* <a
            href={slide.link}
            className="mt-4 bg-amber-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm sm:text-base font-semibold shadow"
          >
            Shop Now →
          </a> */}
        </div>
      </div>
    ))}
  </div>

  {/* Left Arrow */}
  <button
    onClick={prevSlide}
    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-gray-200 z-20"
  >
    ‹
  </button>

  {/* Right Arrow */}
  <button
    onClick={nextSlide}
    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-gray-200 z-20"
  >
    ›
  </button>

  {/* Dots */}
  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
    {slides.map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentIndex(i)}
        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
          currentIndex === i ? "bg-amber-500" : "bg-gray-300"
        }`}
      />
    ))}
  </div>
</section>
     
        <StoreFeatures />
        <Spiritualkarungalishowcase />       
        <SpiritualBanner />
        <Sacredofferbar />
        <DivineGallery />
        <Faq />
        <Testimonials />
        <BlogSection />
        <ShippingFeatures />


       

      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
