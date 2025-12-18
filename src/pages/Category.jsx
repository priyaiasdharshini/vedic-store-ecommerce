// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ArrowLeftIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useProduct } from "../contexts/ProductContext";
import api from "../utils/api"; // axios instance

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const { products, categories, getProductsByCategory, getCategories } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [categoryCounts, setCategoryCounts] = useState({});
  const [countsLoading, setCountsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const [query, setQuery] = useState({
    search:'',
    min_price:0.0,
    max_price:200000,
  })

  const handleChangeQuery = (e)=>{
    const {name, value} = e.target
    setQuery(prev => ({
      ...prev,
      [name]:value
    }))
    console.log(query)
  }

  const navigate = useNavigate();

  
  useEffect(()=>{
    handleSearch(query)
  },[query])
  
  // Search handler
  const handleSearch = async (query) => {
    setSearchLoading(true);
    try {
      const res = await api.post(`/api/search`,query);
      console.log(res.data)
      if (Array.isArray(res.data.results || res.data)) {
        setFilteredProducts(res.data.results || res.data);
      } else {
        setFilteredProducts([]);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  // Fetch categories once
  useEffect(() => {
    const fetchInitial = async () => {
      await getCategories();
    };
    fetchInitial();
  }, [getCategories]);

  // Fetch category counts
  const fetchCountForCategory = async (category_id) => {
    try {
      const res = await api.post(`/api/product-by-category?page=1&page_size=1`, { category_id });
      return res.data?.count ?? 0;
    } catch (err) {
      console.error("Error fetching category count:", err);
      return 0;
    }
  };

  useEffect(() => {
    if (!categories || categories.length === 0) return;

    let mounted = true;
    const fetchAllCounts = async () => {
      setCountsLoading(true);
      try {
        const promises = categories.map((cat) =>
          fetchCountForCategory(cat.id).then((count) => ({ id: cat.id, name: cat.name, count }))
        );
        const results = await Promise.all(promises);
        if (!mounted) return;
        const countsObj = results.reduce((acc, r) => {
          acc[(r.name || "").toLowerCase()] = r.count;
          return acc;
        }, {});
        setCategoryCounts(countsObj);
      } catch (err) {
        console.error("Failed to fetch category counts:", err);
      } finally {
        if (mounted) setCountsLoading(false);
      }
    };

    const needFetch = categories.some((cat) => !( (cat.name || "").toLowerCase() in categoryCounts ));
    if (needFetch) fetchAllCounts();

    return () => {
      mounted = false;
    };
  }, [categories]);

  // Select category
  const handleCategorySelect = async (slug) => {
    const category = categories.find(
      (cat) => (cat.name || "").toLowerCase() === (slug || "").toLowerCase()
    );

    if (category) {
      setFilteredProducts([]);
      await getProductsByCategory(1, 10, category.id);
      navigate(`/category/${slug.toLowerCase()}`);
      setIsSidebarOpen(false);
    } else {
      navigate("/");
    }
  };

  // Fetch products when category changes
  useEffect(() => {
    if (categories.length > 0 && categorySlug) {
      handleCategorySelect(categorySlug);
    }
  }, [categorySlug, categories]);

  // Filter and type setup
  useEffect(() => {
    if (products && products.length) {
      const typesSet = [...new Set(products.map((p) => p.type).filter(Boolean))];
      setTypes(typesSet);

      const prices = products.map((p) => Number(p.price) || 0);
      const minPrice = prices.length ? Math.min(...prices) : 0;
      const maxPrice = prices.length ? Math.max(...prices) : 10000;
      setPriceRange({ min: minPrice, max: maxPrice });

      setFilteredProducts(products);
    } else {
      setFilteredProducts([]);
      setTypes([]);
    }
  }, [products]);


  // Filters
  const applyFilters = (type = "", price = priceRange) => {
    let filtered = products || [];
    if (type) filtered = filtered.filter((p) => p.type === type);
    filtered = filtered.filter(
      (p) => Number(p.price) >= price.min && Number(p.price) <= price.max
    );
    setFilteredProducts(filtered);
  };

  const handleSelectType = (e) => applyFilters(e.target.value, priceRange);
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newRange = { ...priceRange, [name]: Number(value) };
    setPriceRange(newRange);
    applyFilters(document.querySelector("select")?.value || "", newRange);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="container mx-auto py-6 px-4 sm:px-6 flex gap-6">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg w-64 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 fixed inset-y-0 left-0 z-50 lg:sticky lg:top-24 lg:translate-x-0 lg:w-60 lg:h-[calc(100vh-6rem)] lg:z-10 overflow-y-auto`}
        >
          <div className="flex justify-between items-center border-b px-4 py-3 lg:hidden">
            <h3 className="font-bold text-lg text-amber-800">Categories</h3>
            <button onClick={() => setIsSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-amber-800" />
            </button>
          </div>

          <nav className="p-4 space-y-3">
            {categories.map((cat) => {
              const slugLower = (cat.name || "").toLowerCase();
              const isActive = (categorySlug || "").toLowerCase() === slugLower;
              const count = categoryCounts[slugLower];
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(slugLower)}
                  className={`flex justify-between items-center w-full text-left px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive ? "bg-amber-200 text-black" : "text-black hover:bg-amber-100"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-gray-600 text-xs">
                    {countsLoading ? "…" : (typeof count === "number" ? count : 0)}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition"
              >
                <ArrowLeftIcon className="h-5 w-5 text-amber-800" />
              </button>
              <h2 className="text-2xl sm:text-3xl font-bold text-black capitalize">
                {categorySlug}
              </h2>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="ml-auto lg:hidden p-2 rounded-md bg-amber-100 hover:bg-amber-200"
              >
                <Bars3Icon className="h-6 w-6 text-amber-800" />
              </button>
            </div>

            {/* 🔍 Search bar */}
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                value={query.search}
                name='search'
                onChange={handleChangeQuery}
                placeholder="Search sacred items..."
                className="w-full sm:w-72 px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
              />
              {searchLoading && (
                <span className="text-sm text-gray-500 animate-pulse">Searching...</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-black">{filteredProducts.length} sacred items</p>

              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="min_price"
                    value={query.min_price}
                    min={0}
                    onChange={handleChangeQuery}
                    className="w-20 px-2 py-1 border rounded text-sm"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="max_price"
                    value={query.max_price}
                    onChange={handleChangeQuery}
                    className="w-20 px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                {query.search ? "No products found for your search" : "No products found in this category"}
              </p>
              <button
                className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm hover:bg-amber-700 transition duration-300"
                onClick={() => navigate(-1)}
              >
                Back to Categories
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
