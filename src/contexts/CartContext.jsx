import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../utils/api";
import { useProduct } from "./ProductContext"; // ✅ import product context

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { getProductByVariant } = useProduct(); // ✅ access function
  const [variantCache, setVariantCache] = useState({}); // ✅ to avoid refetching same variant

  // ✅ Cached variant fetch helper
  const fetchVariantDetails = useCallback(
    async (variant_id) => {
      if (variantCache[variant_id]) return variantCache[variant_id];
      try {
        const response = await api.post("/api/productvariant-details", {
          product_variant_id: variant_id,
        });
        const { variant } = response.data;
        setVariantCache((prev) => ({ ...prev, [variant_id]: variant }));
        return variant;
      } catch (error) {
        console.error("Error fetching variant:", error.response?.data || error);
        return null;
      }
    },
    [variantCache]
  );

  // ✅ Get all cart items + enrich with product data
  const getCartItems = useCallback(async () => {
    try {
      const response = await api.post("/api/getcart");
      const { items } = response.data;

      const enrichedItems = await Promise.all(
        (items || []).map(async (item) => {
          const productDetails = await fetchVariantDetails(item.product_variant);
          return {
            ...item,
            price: productDetails?.price || 0,
            product_image: productDetails?.product_image || null,
            product_name:
              productDetails?.display_name ||
              productDetails?.product_name ||
              "Unknown Product",
          };
        })
      );

      setCartItems(enrichedItems);
    } catch (error) {
      console.error("Error fetching cart items:", error.response?.data || error);
    }
  }, [fetchVariantDetails]);

  useEffect(() => {
    getCartItems();
  }, [refresh]);

  // ✅ Add to Cart
  const addToCart = async (itemData) => {
    try {
      const response = await api.post("/api/add-to-cart", itemData);
      console.log("Add to cart:", response.data);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error);
      throw error;
    }
  };

  // ✅ Increase quantity
  const cartItemPlus = async (itemId) => {
    try {
      await api.post("/api/cart/item/plus", { cart_item_id: itemId });
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Increase cart item error:", error.response?.data || error);
    }
  };

  // ✅ Decrease quantity
  const cartItemMinus = async (itemId) => {
    try {
      await api.post("/api/cart/item/minus", { cart_item_id: itemId });
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Decrease cart item error:", error.response?.data || error);
    }
  };

  // ✅ Delete cart item
  const deleteCartItem = async (itemId) => {
    try {
      await api.post("/api/cart/item/delete", { cart_item_id: itemId });
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Delete cart item error:", error.response?.data || error);
    }
  };

  // ✅ Get total price
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + price * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  // ✅ Get total quantity
  const getCartItemsCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + (item.quantity || 0), 0);
  }, [cartItems]);

  const getItemQuantity = (id) => {
   
    const product = cartItems.find((item, index) => item.product_variant===id)
    return product?.quantity || 0
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        getCartItems,
        addToCart,
        cartItemPlus,
        cartItemMinus,
        deleteCartItem,
        getCartTotal,
        getCartItemsCount,
        getItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
