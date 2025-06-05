"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation"; // For client-side navigation in Next.js 13+

const Header = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter(); // Next.js router

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="bg-lime-500 text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl text-white font-mono font-bold">TemplateWave</h1>

        {/* Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="border p-2 w-full rounded-lg"
          />
          <Search
            className="absolute right-3 top-3 h-5 w-5 text-gray-500 cursor-pointer"
            onClick={handleSearch}
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          {/* Home Dropdown */}
          <div className="relative">
            <Button
              variant="link"
              onClick={toggleCategoryDropdown}
              className="flex items-center space-x-2"
            >
              <span className="text-white">Tailwind CSS</span>
              <Menu className="h-5 w-5" />
            </Button>

            {isCategoryDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                <Link href="">
                  <p className="block px-4 py-2 hover:bg-gray-200">Dashboards</p>
                </Link>
                <Link href="">
                  <p className="block px-4 py-2 hover:bg-gray-200">Premium Products</p>
                </Link>
              </div>
            )}
          </div>

          {/* More Dropdown */}
          <div className="relative">
            <Button
              variant="link"
              onClick={toggleMoreDropdown}
              className="flex items-center space-x-2"
            >
              <span className="text-white">More</span>
              <Menu className="h-5 w-5" />
            </Button>

            {isMoreDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                <Link href="/about">
                  <p className="block px-4 py-2 hover:bg-gray-200">About Us</p>
                </Link>
                <Link href="/contact">
                  <p className="block px-4 py-2 hover:bg-gray-200">Contact</p>
                </Link>
                <Link href="/services">
                  <p className="block px-4 py-2 hover:bg-gray-200">Services</p>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
