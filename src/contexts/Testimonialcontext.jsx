// src/contexts/Testimonialcontext.jsx
import React, { createContext, useContext, useState } from "react";
import { getTestimonials } from "../utils/api" // ✅ correct import path

const TestimonialContext = createContext();

export const TestimonialProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    const data = await getTestimonials();
    setTestimonials(data);
  };

  return (
    <TestimonialContext.Provider value={{ testimonials, fetchTestimonials }}>
      {children}
    </TestimonialContext.Provider>
  );
};

export const useTestimonials = () => useContext(TestimonialContext);
