import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductVariant } from "../contexts/ProductvariantContext";
import ProductByVariant from "../components/ProductByVariant";
import ProductCard from "../components/ProductCard";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { product, fetchProductById, loading, error } = useProductVariant();

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductCard product={product} />
        <ProductByVariant product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
