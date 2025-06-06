import React from 'react'
import Image from 'next/image'
// import { useParams } from 'next/navigation'

const profile = () => {
  return (
    <div className="overflow-y-auto sm:p-0 pt-4 pr-4 pb-20 pl-4 bg-gray-800">
    <div className="flex justify-center items-end text-center min-h-screen sm:block">
      <div className="bg-gray-500 transition-opacity bg-opacity-75" />
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
        ​
      </span>
      <div
        className="inline-block text-left bg-gray-900 rounded-lg overflow-hidden align-bottom transition-all transform
  shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
      >
        <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
          <div className="grid grid-cols-1">
            <div className="mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg">              <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                <Image
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="Admin Profile"
                  width={64}
                  height={64}
                  className="flex-shrink-0 object-cover object-center btn- flex w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
                />
                <p className="mt-8 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">
                 Owners Name
                </p>
                <p className="mt-3 text-base leading-relaxed text-center text-gray-200">
                  This template belomgs to me
                </p>
                <div className="w-full mt-6">
                  <a
                    className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
              font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    React Template Admin
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default profile;