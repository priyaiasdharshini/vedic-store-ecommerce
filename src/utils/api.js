// src/api.js
import axios from "axios";

// ✅ Helper to read CSRF cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: false,
});
// Automatically attach CSRF token
api.interceptors.request.use((config) => {
  const csrftoken = getCookie("csrftoken");
  if (csrftoken) {
    config.headers["X-CSRFToken"] = csrftoken;
  }
  return config;
});



api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    // console.log("Request Headers:", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Add this function
export const getTestimonials = async () => {
  try {
    const response = await api.get("/api/core/testimonials/");
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};



// ✅ Fetch products by variant filters
export const getProductsByVariant = async (variantFilters) => {
  try {
    const response = await api.post("/api/product-by-variant/", {
      variants: variantFilters,
    });
    console.log("Variant Filter Products:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching variant products:", error);
    return [];
  }
};
// ✅ Corrected Cart API endpoints

export const increaseCartItem = async (itemId) => {
  try {
    const response = await api.post("", {
      cart_item_id: itemId, // ✅ Django expects this name
    });
    return response.data;
  } catch (error) {
    console.error("Error increasing cart item:", error.response?.data || error);
    throw error;
  }
};

export const decreaseCartItem = async (itemId) => {
  try {
    const response = await api.post("/api/cart/item/minus", {
      cart_item_id: itemId, // ✅ same key name
    });
    return response.data;
  } catch (error) {
    console.error("Error decreasing cart item:", error.response?.data || error);
    throw error;
  }
};

export const deleteCartItem = async (itemId) => {
  try {
    const response = await api.delete("/api/cart/item/delete", {
      data: { cart_item_id: itemId }, // ✅ correct key name
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting cart item:", error.response?.data || error);
    throw error;
  }
};



export default api;
