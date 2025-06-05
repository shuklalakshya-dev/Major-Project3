'use client'
import axios from 'axios';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import JsxParser from 'react-jsx-parser';
import StarRatings from 'react-star-ratings';


const TemplateDetails = () => {
  const token = localStorage.getItem('token');

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();

  const [rating, setRating] = useState(4)

  const reviewForm = useFormik({
    initialValues: {
      review: '',
    },
    onSubmit: (values) => {
      values.template = id;
      values.rating = rating;
      console.log(values);

      axios.post('http://localhost:5000/review/add', values, {
        headers: {
          'x-auth-token': token
        }
      })
        .then((result) => {
          console.log(result.status);
          toast.success('Review added Successfully');
        }).catch((err) => {
          toast.error('Some Error Occured');
        });
    },
  })
  const fetchReviews = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/review/getbytemplate/' + id);
      console.log(res.data);
      setReviews(res.data);
    }
    catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews])

  // Fetch product details from the server
    const fetchDetails = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/template/getbyid/' + id);
      console.log(res.data);

      setSelectedTemplate(res.data);
    } catch (err) {
      setError('Error fetching  details');
      toast.error('Error fetching  details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  // Placeholder for when no image is available
  const placeholderImage = 'https://via.placeholder.com/300';



  return (
    <div className=" min-h-screen p-8 flex bg-white flex-col justify-center items-center"

    >
      <h1 className="text-5xl text-center  text-black  p-4 mb-8 font-bold  rounded-lg">
        Template Details
      </h1>

      <div className="w-full max-w-4xl rounded-lg border  bg-card text-card-foreground shadow-sm flex flex-col space-y-4 p-6"

      >
        {/* Template Details */}
        {loading ? (
          <p className="text-xl text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          selectedTemplate && (
            <div className="rounded-lg border bg-white  bg-card text-card-foreground shadow-sm flex flex-col space-y-4 p-6">


              {/* Image Section */}              <a className="col-span-4  flex justify-center">
                <Image
                  src={selectedTemplate.image || placeholderImage}
                  alt={selectedTemplate.name}
                  width={400}
                  height={320}
                  className="w-full h-80 object-cover rounded-lg shadow-lg transition-transform transform "
                />
              </a>

              {/* Product Info Section */}
              <div className="text-5xl bg-white text-center text-white shadow-lg p-4 mb-8 font-bold  rounded-lg">
                <div className="mb-4">
                  <p className="font-bold text-2xl text-black">

                    <span className="block mt-1 font-bold text-black">{selectedTemplate.name}</span>
                  </p>
                </div>

                <div className="mb-4">
                  <p className="font-bold text-xl text-black">
                    Description:
                    <span className="block mt-1 text-gray-600">{selectedTemplate.description}</span>
                  </p>
                </div>

                <div className="">
                  <p className="font-bold text-xl text-black">
                    CodeSnippet:

                    {/* <span className="block mt-1 text-green-600">{selectedTemplate.codeSnippet}</span> */}
                    {/* <MyCodeBlock code={selectedTemplate.codeSnippet} language={jsx} /> */}


                  </p>
                </div>

                <div className="">
                  <p className="font-bold text-xl text-black">
                    Price:
                    <span className="block mt-1 text-green-600">₹ {selectedTemplate.price}</span>
                  </p>
                </div>

                <a className="">
                  <p className="font-bold text-xl text-black">
                    Downloads:
                    <span className="block mt-1 text-green-600">{selectedTemplate.downloads}</span>
                  </p>
                </a>

                {/* Buy Now Button */}
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Buy Now</button>
              </div>
            </div>

          )
        )}
        {
          selectedTemplate !== null && (
            <div className='snippet'>
              <JsxParser jsx={selectedTemplate.codeSnippet} />
            </div>
          )
        }
        {
          token ? (
            <>
              <StarRatings
                rating={rating}
                starRatedColor="blue"
                changeRating={setRating}
                numberOfStars={5}
                name='rating'
              />
              <form onSubmit={reviewForm.handleSubmit}>
                <div>

                  <h1>Reviews</h1>
                  <textarea
                    rows={10}
                    className='w-full p-5 mt-4 border-2 rounded-md'
                    name=""
                    id="review"
                    placeholder='Enter Your Review Here...'
                    value={reviewForm.values.review}
                    onChange={reviewForm.handleChange}
                  ></textarea>
                  <button classname="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded" type='submit' onClick={fetchReviews}>Add Review</button>

                </div>
              </form>
            </>
          ) : (
            <p className='text-red-500'>Please Login to Add Review</p>
          )
        }

        {/* Display Reviews */}
        <div>
          <h3 className="text-lg font-medium mb-2">Customer Reviews:</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border-b py-2 grid grid-cols-12 gap-4">
                <p className='col-span-2 text-sm text-gray-600'>
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <div className="col-span-10">
                  <h4 className="font-semibold">{review.user.name}</h4>
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    starDimension='20px'
                    starSpacing='2px'
                    readOnly
                  />
                  <p className="text-sm text-gray-600">{review.review}</p>

                </div>

              </div>
            ))
          ) : (
            <p>
              No reviews yet. Be the first to review this product!
            </p>
          )
          }
        </div>

      </div>
    </div >
  );
};

export default TemplateDetails;
