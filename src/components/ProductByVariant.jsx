import React, { useEffect } from "react";
import { useProductVariant } from "../contexts/ProductvariantContext";
import ProductCard from "./ProductCard";

const ProductVariant = () => {
  const { products, fetchProducts, loading, error } = useProductVariant();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (products.length === 0) return <p>No product variants found.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductVariant;
