"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import {
  ShoppingCart,
  Search,
  Heart,
  Star,
  Menu,
} from "lucide-react";

type ProductType = "fashion" | "electronics" | "food" | "other";

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  type: ProductType;
  image: string;
  rating: number;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Using relative paths handles port mismatches automatically on the client side
        const res = await fetch("/api/products");
        
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        
        const jsonResponse = await res.json();
        
        // Safety check to ensure we map exactly where your array is stored
        const fetchedData = jsonResponse.data || jsonResponse;
        setProducts(Array.isArray(fetchedData) ? fetchedData : []);
      } catch (err) {
        console.error("Error loading products:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  return (
    <main className="min-h-screen bg-[#f7f3ff]">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Menu className="md:hidden text-purple-700" />
            <h1 className="text-2xl font-black text-purple-700">
              MARKETPLACE
            </h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl mx-10 relative">
            <input
              type="text"
              placeholder="Search clothes, shoes, gadgets..."
              className="w-full border-2 border-purple-200 focus:border-purple-600 outline-none rounded-full px-5 py-3"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-700 hover:bg-purple-800 text-white rounded-full p-2 transition">
              <Search size={18} />
            </button>
          </div>

          <div className="flex items-center gap-5">
            <Heart className="text-purple-700 cursor-pointer" />
            <ShoppingCart className="text-purple-700 cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[4px] mb-3 text-sm">
              New Collection 2026
            </p>
            <h2 className="text-5xl md:text-6xl font-black leading-tight">
              Style Meets <span className="block text-yellow-300">Luxury</span>
            </h2>
            <p className="mt-6 text-lg text-purple-100 max-w-lg">
              Discover premium fashion, trendy outfits, sneakers, bags and
              accessories with unbeatable prices.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="bg-white text-purple-700 px-6 py-3 rounded-full font-bold hover:scale-105 transition">
                Shop Now
              </button>
              <button className="border border-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-purple-700 transition">
                Explore
              </button>
            </div>
          </div>

          <div className="relative h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop"
              alt="Fashion"
              fill
              className="object-cover rounded-3xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            "Men",
            "Women",
            "Sneakers",
            "Bags",
            "Watches",
            "Luxury",
            "Streetwear",
            "Accessories",
          ].map((item) => (
            <button
              key={item}
              className="bg-white whitespace-nowrap px-6 py-3 rounded-full shadow hover:bg-purple-700 hover:text-white transition font-semibold"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-black text-gray-900">
            Trending Products
          </h3>
          <button className="text-purple-700 font-bold">
            View All →
          </button>
        </div>

        {/* Dynamic State Layout States */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl h-96 animate-pulse p-5 flex flex-col justify-between">
                <div className="bg-gray-200 h-52 rounded-2xl w-full" />
                <div className="bg-gray-200 h-6 rounded w-3/4 mt-4" />
                <div className="bg-gray-200 h-8 rounded w-1/4 mt-2" />
                <div className="bg-gray-200 h-10 rounded-xl w-full mt-4" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center font-medium">
            ⚠️ Error loading trending products: {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="bg-white border text-gray-500 px-6 py-12 rounded-3xl text-center font-medium shadow-sm">
            No products found matching this collection right now.
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition group"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                    <Heart size={18} className="text-purple-700" />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-semibold text-gray-700">
                      {product.rating}
                    </span>
                  </div>

                  <h4 className="font-bold text-lg text-gray-900">
                    {product.name}
                  </h4>

                  <div className="flex items-center gap-3 mt-3">
                    <p className="text-2xl font-black text-purple-700">
                      ${product.price}
                    </p>
                    {product.oldPrice && (
                      <p className="text-gray-400 line-through">
                        ${product.oldPrice}
                      </p>
                    )}
                  </div>

                  <button className="w-full mt-5 bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-2xl font-bold transition">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-r from-purple-800 to-purple-500 rounded-[40px] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h3 className="text-4xl font-black">
              Get 30% OFF This Week
            </h3>
            <p className="mt-4 text-purple-100 max-w-xl">
              Upgrade your wardrobe with trending fashion pieces and exclusive
              deals.
            </p>
          </div>
          <button className="bg-white text-purple-700 px-8 py-4 rounded-full font-black hover:scale-105 transition">
            Claim Offer
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-950 text-purple-100">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-2xl font-black text-white">
              MARKETPLACE
            </h4>
            <p className="mt-4 text-sm leading-7">
              Modern eCommerce fashion platform inspired by global marketplaces
              like AliExpress.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Shop</h5>
            <ul className="space-y-3 text-sm">
              <li>Men Fashion</li>
              <li>Women Fashion</li>
              <li>Sneakers</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Support</h5>
            <ul className="space-y-3 text-sm">
              <li>Help Center</li>
              <li>Track Order</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Newsletter</h5>
            <div className="flex mt-4">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 rounded-l-2xl outline-none text-black"
              />
              <button className="bg-purple-600 px-5 rounded-r-2xl font-bold">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-purple-900 text-center py-5 text-sm">
          © 2026 marketplace. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
