"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/AboutUs" },
  { name: "Feedback", href: "/feedback" },
  { name: "Contact", href: "/ContactUs" },
]

export function OrderNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="text-black shadow-lg bg-lime-600 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-4 px-2 font-semibold hover:text-green-500 transition bg-lime-600 hover:bg-lime-700 duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 bg-lime-600">
            <a href="/signin"><Button variant="" className=" hover:text-green-500  hover:bg-lime-700 transition-all duration-300">Login</Button></a>
            <a href="/signup"><Button variant="" className=" hover:text-green-500  hover:bg-lime-700 transition-all duration-300" >Sign Up</Button></a>
          </div>
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="mobile-menu md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 px-4 text-sm hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="p-4">
            <Button variant="outline" className="w-full mb-2">
              Login
            </Button>
            <Button className="w-full">Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  )
}

