// src/contexts/ProductContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import api from "../utils/api";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState(false);


  const getCategories = useCallback(async () => {
    try {
      const response = await api.get('/api/categories')
      // console.log(response.data)
      const { count, next, previous, results } = response.data
      setCategories(results || [])
    }
    catch (err) {
      console.error("❌ Error fetching products:", error);
    }
  }, [])

  // ✅ Fetch all products by categories with pagination
  const getProductsByCategory = useCallback(async (page = 1, limit = 10, category_id = 1) => {
    try {
      setLoading(true);
      const response = await api.post(`/api/product-by-category?page=${page}&page_size=${limit}`, { category_id });

      // Backend returns: { count, previous, next, results: { categories, products } }
      console.log(response.data)
      const { count, previous, next, results } = response.data;
      // const { categories = [], products = [] } = results || {};

      // setCategories(categories);
      setProducts(results || []);
      setPagination({ count, next, previous });
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  // Fetch product by using product_variant_id
  const getProductByVariant = useCallback(async (variant_id) => {
    try {
      const response = await api.post('/api/productvariant-details', { product_variant_id: variant_id })
      console.log(response.data)
      const {variant, other_variants} = response.data
      return variant
    }
    catch (error) {
      console.error("Error getProdcutByVariant:", error.response?.data || error);
      throw error;
    }
  }, [])

  return (
    <ProductContext.Provider
      value={{
        categories,
        products,
        pagination,
        loading,
        getProductsByCategory,
        getCategories,
        getProductByVariant
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);


