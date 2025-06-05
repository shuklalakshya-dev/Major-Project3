"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { loadRazorpayScript } from '../../../utils/loadRazorpay';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, ShoppingCart } from "lucide-react";

// Simulated data for browsing items
const TemplateCart = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);


  const [templateList, setTemplateList] = useState([]);

  const templatesData = async () => {
    const res = await axios.get('http://localhost:5000/template/getall');
    console.log(res.status);
    console.table(res.data);
    setTemplateList(res.data);
  }

  useEffect(() => {
    templatesData();
  }, []);


  //payment
  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    // Step 1: Create order
    const order = await axios.post('http://localhost:5000/api/payment/create-order', {
      amount: 500, // Rs 500
      currency: "INR",
      receipt: "receipt#1"
    });

    const options = {
      key: "rzp_test_RQSqpXM9R7eM5e", // from Razorpay Dashboard
      amount: order.data.amount,
      currency: order.data.currency,
      name: "Your Company Name",
      description: "Test Transaction",
      order_id: order.data.id,
      handler: async function (response) {
        const verify = await axios.post('http://localhost:5000/api/payment/verify', response);
        if (verify.data.status === 'success') {
          alert("Payment successful!");
        } else {
          alert("Payment failed!");
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };





  return (
    <div className="min-h-screen bg-lime-200">

      {/* Navbar */}
      <nav className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-sans font-bold justify justify-center text-center">Browse Template</h1>

        </div>
      </nav>

      {/* Search Bar and Items */}
      <main className="container mx-auto my-8 px-4">
        {/* Search Input */}        {/* Browse Items */}
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templateList.map((templates) => (            <Card className='bg-white rounded-2xl' key={templates._id}>
              <CardHeader>
                <Image
                  src={templates.image}
                  alt={templates.name}
                  width={400}
                  height={160}
                  className="w-full h-40 object-cover  mb-4 rounded"
                />
                <CardTitle>{templates.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black">{templates.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-green-600 font-semibold">
                  ${templates.price}
                </span>
                <Link href={'/template-details/' + templates._id}>View More</Link>

                <button onClick={handlePayment} className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded">Buy Now</button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {templateList.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No items found. Try a different search term.
          </p>
        )}
      </main>
    </div>
  );
}

export default TemplateCart;
