import React, { createContext, useContext, useState } from "react";
import api from "../utils/api";

const ProductVariantContext = createContext();

export const ProductVariantProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // multiple variants
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("product-by-variant/");
      // If API returns array directly
      setProducts(res.data); 
      // If API returns { results: [...] }, use: setProducts(res.data.results);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductVariantContext.Provider
      value={{ products, fetchProducts, loading, error }}
    >
      {children}
    </ProductVariantContext.Provider>
  );
};

export const useProductVariant = () => useContext(ProductVariantContext);
