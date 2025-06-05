import React from "react";

function ContactForm() {
  return (
    <div className="bg-lime-300 flex  items-center justify-center min-h-screen">
      <div className="max-w-5xl w-full bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Section */}
        <div className="bg-lime-200 rounded-lg text-white p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl text-black font-bold mb-4">Get in touch</h2>
            <p className="text-black">mohdshahan171@gmail.com</p>
            <p className="text-black my-2">+91 1234567892</p>
            <p className="text-black">Los Angeles</p>
          </div>
          <p className="mt-6 text-black">Customer Service Department</p>
        </div>

        {/* Right Section */}
        <div className="bg-lime-500 rounded-lg p-8 md:w-1/2">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block rounded-2xl text-gray-700 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Henry Edison"
                className="w-full p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium">
                Phone Number (Optional)
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone number"
                className="w-full p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>

            <div>
              <label htmlFor="inquiry" className="block text-gray-700 font-medium">
                Inquiry Type
              </label>
              <select
                id="inquiry"
                name="inquiry"
                className="w-full p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <option value="partnership">Partnership</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your message..."
                className="w-full p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-2xl hover:bg-gray-700 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
