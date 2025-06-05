import React from "react";
import Image from "next/image";

function AboutUs() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      {/* Hero Section */}
      <section className="w-full bg-lime-500 text-white text-center py-16 px-8">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl max-w-3xl mx-auto">
          We are a passionate team dedicated to bringing eco-friendly solutions
          to your doorstep. Our mission is to promote sustainability and help
          people live greener, healthier lives.
        </p>
      </section>

      {/* Team Section */}
      <section className="w-full max-w-6xl py-16 px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Image
              src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/39261fbbefa65d409eb3d909/b5f9e7f9-f0cf-42fb-96c9-3156bc7d64a2.jpg"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Bob Brown</h3>
            <p className="text-gray-600">Creative Leader</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Image
              src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/0e453705dc725e089d6e2749/1.jpg"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Nick Dark</h3>
            <p className="text-gray-600">Sales Manager</p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Image
              src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/b2d43da24f4b52ff8a5d69df/vbvb.jpg"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Adrian Scold</h3>
            <p className="text-gray-600">Developer</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full bg-gray-200 py-16 px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Sustainability
            </h3>
            <p className="text-gray-600">
              We are committed to providing eco-friendly products and services
              that promote a sustainable future.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Innovation
            </h3>
            <p className="text-gray-600">
              Innovation is at the heart of everything we do, driving us to
              create better, more efficient solutions.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Customer First
            </h3>
            <p className="text-gray-600">
              Our customers are our top priority. We strive to exceed their
              expectations with exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-lime-500 text-white py-8 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUs;