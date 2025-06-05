import { useFormik } from 'formik';
import React from 'react';

const Review = ({ author, content, date }) => {

    

    return (
        <div className="review">
            <h3>{author}</h3>
            <p>{content}</p>
            <small>{new Date(date).toLocaleDateString()}</small>
        </div>
    );
};

export default Review;