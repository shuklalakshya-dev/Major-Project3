'use client'
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios';
import { Menu, Search } from "lucide-react";
import { loadRazorpayScript } from '../utils/loadRazorpay';
// In ./src/app/user/profile/page.jsx
// Add this import at the top of the file
import Image from 'next/image';


const HomePage = () => {
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

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isoneMoreDropdownOpen, setIsoneMoreDropdownOpen] = useState(false);

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
  };

  const toggleoneMoreDropdown = () => {
    setIsoneMoreDropdownOpen(!isoneMoreDropdownOpen);
  };


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
    <div className="bg-black">

      <header className="px-4 lg:px-6 h-14 flex bg-lime-400  items-center">
        <a href="#" className="flex items-center justify-center">
        </a>
        <nav className="ml-auto flex gap-2 ">

          {/* Home Dropdown */}
          <div className="relative">
            <button
              variant="link"
              onClick={toggleCategoryDropdown}
              className="flex items-center space-x-2"
            >
              <span className="text-white">Tailwind CSS</span>
              <Menu className="h-5 w-5" />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 border border-lime-300 bg-lime-200 rounded-xl shadow-md z-10">
                <Link href="dashboard">
                  <p className="block px-4 py-2 hover:bg-gray-200">Dashboards</p>
                </Link>
                <Link href="premium">
                  <p className="block px-4 py-2 hover:bg-gray-200">Premium Products</p>
                </Link>

              </div>
            )}
          </div>

          {/* More Dropdown */}
          <div className="relative ">
            <button
              variant="link"
              onClick={toggleMoreDropdown}
              className="flex items-center space-x-2"
            >
              <span className="text-white">Bootstrap</span>
              <Menu className="h-5 w-5" />
            </button>

            {isMoreDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-lime-200 border border-lime-100  rounded-xl shadow-md z-10">
                <Link href="/about">
                  <p className="block px-4 py-2 hover:bg-gray-200">Login Form</p>
                </Link>
                <Link href="/contact">
                  <p className="block px-4 py-2 hover:bg-gray-200">UI Kits</p>
                </Link>
                <Link href="/services">
                  <p className="block px-4 py-2 hover:bg-gray-200">Landing Pages</p>
                </Link>
              </div>
            )}
          </div>

          {/* links */}
          <a
            className="text-white font-bold py-2 px-4 rounded"
            href="signin"
          >
            Login
          </a>
          <a
            className=" text-white font-bold py-2 px-4 rounded"
            href="signup"
          >
            SignUp
          </a>
          <a
            className="text-white font-bold py-2 px-4 rounded"
            href="AboutUs"
          >
            About
          </a>
          <a
            className="text-white font-bold py-2 px-4 rounded"
            href="ContactUs"
          >
            Contact
          </a>
        </nav>
      </header>
      <main className="flex-1">

        {/* Home Dropdown */}
        <div className="relative bg-lime-200">
          <button
            variant="link"
            onClick={toggleoneMoreDropdown}
            className="flex items-center"
          >
            <span className="text-white"></span>
            <Menu className="h-5 w-5" />
          </button>

          {isoneMoreDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 border border-black-600 bg-lime-100 rounded-xl shadow-md z-10">
              <Link href="">
                <p className="block px-4 py-2 hover:bg-gray-200">Figma</p>
              </Link>
              <Link href="">
                <p className="block px-4 py-2 hover:bg-gray-200">Forms</p>
              </Link>
              <Link href="">
                <p className="block px-4 py-2 hover:bg-gray-200">Wordpress</p>
              </Link>
              <Link href="">
                <p className="block px-4 py-2 hover:bg-gray-200">Tailwind CSS</p>
              </Link>
              <Link href="">
                <p className="block px-4 py-2 hover:bg-gray-200">Dashboards</p>
              </Link>
            </div>
          )}
        </div>

        <section
          className="w-full mx-auto py-12 bg-lime-200 md:py-24 lg:py-32 xl:py-48  text-lime-800 bg-cover bg-center"
        // style={{
        //   backgroundImage: 'url("https://i.pinimg.com/564x/a6/5f/bb/a65fbb897ddfffd954551360dd68f3e0.jpg")',
        // }}
        >
          <div className="container px-4 md:px-6 mx-auto "

          >
            <div className="flex flex-col items-center space-y-4 text-center">


              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to TemplateWave
                </h1>
                <p className="mx-auto max-w-[700px] text-lime-600 md:text-xl">
                  Discover amazing templates across various categories. Shop now and
                  enjoy great deals!
                </p>
              </div>
              <div className="space-x-4">
                <a className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
                  href="browse-template"
                >
                  All Templates
                </a>
                <a className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
                  href="AboutUs"
                >
                  About Us
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-lime-100 py-12 md:py-24 lg:py-32   ">
          <div className="container  px-4 md:px-6 mx-auto ">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 ">
              Featured Templates
            </h2>
            <div className="flex flex-col  space-y-6 p-6 ">              {templateList.map((templates) => (
                <div key={templates._id} className="rounded-2xl border bg-white transform  transition-transform duration-200 bg-card text-card-foreground shadow-sm flex flex-col space-y-4 p-6">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">{templates.name}</h3>
                  <Image
                    src={templates.image}
                    alt={templates.name}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <p className="text-black font-bold  mb-4">₹{templates.price}</p>
                  <button onClick={handlePayment} className="flex justify-center bg-lime-600 hover:bg-purple-700 text-white font-bold py-2 px-10 rounded  w-24">
                    Buy Now
                  </button>

                  <a className="flex space-x-4">

                    <Link href={'/template-details/' + templates._id} className="text-center bg-lime-200 mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"> {/* Centering View More */}
                      View More
                    </Link>
                    <Link href={'#' + templates._id} className="text-center mt-2 inline-flex bg-lime-200 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"> {/* Centering View More */}
                      Preview
                    </Link>

                  </a>




                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="w-full py-12 bg-lime-100 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              New Arrivals
            </h2>
            <div className="grid grid-cols-1  sm:grid-cols-2 gap-6 p-6">
              {templateList.map((templates) => (
                <div
                  key={templates.id}
                  className="rounded-2xl border bg-white transform  transition-transform duration-200 bg-card text-card-foreground shadow-sm flex flex-col space-y-4 p-6"
                >
                  <h3 className="text-2xl font-semibold leading-none tracking-tight">{templates.name}</h3>
                  <Image
                    src={templates.image}
                    alt={templates.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="flex flex-col items-center mt-auto"> {/* Centering the buttons */}

                    <p className="text-black font-bold mb-4">₹{templates.price}</p>

                    <button className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-10 rounded w-full">
                      Buy Now
                    </button>
                    <a className="flex space-x-4  ">

                      <Link href={'/template-details/' + templates._id} className="text-center mt-2 bg-purple-300 rounded-2xl inline-flex items-center justify-center  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"> {/* Centering View More */}
                        View More
                      </Link>
                      <Link href={'#' + templates._id} className="text-center mt-2 inline-flex items-center bg-purple-300 justify-center  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"> {/* Centering View More */}
                        Preview
                      </Link>

                    </a>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* footer */}
      <footer className="bg-lime-500 text-lime-800 py-8">
        <div className="container mx-auto px-4">
          {/* Top section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            {/* Logo and description */}
            <div className="w-full md:w-1/3">
              <h2 className="text-2xl  font-bold mb-2">My Website</h2>
              <p className="text-lime-">
                Your go-to platform for all things awesome. Connect, explore, and enjoy!
              </p>
            </div>

            {/* Links */}
            <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-between">
              {/* Column 1 */}
              <div className="mb-6 md:mb-0">
                <h3 className="font-semibold mb-2">Quick Links</h3>
                <ul>
                  <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Services</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="mb-6 md:mb-0">
                <h3 className="font-semibold mb-2">Support</h3>
                <ul>
                  <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className="mb-6 md:mb-0">
                <h3 className="font-semibold mb-2">Follow Us</h3>
                <ul className="flex space-x-4">
                  <li><a href="#" className="text-gray-300 hover:text-white">Facebook</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Twitter</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">Instagram</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-8 border-t border-gray-700 pt-4 text-center md:text-left">
            <p className="text-gray-300">&copy; 2024 My Website. All rights reserved.</p>
          </div>
        </div>
      </footer>


    </div>
  )
}

export default HomePage;


