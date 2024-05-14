import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ to_rate, rating_value, totalStars }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const rating_actions = (
    <>
      {[...Array(totalStars)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              className="d-none"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={25}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
      <p>
        {rating} out of {totalStars} stars
      </p>
    </>
  );

  const show_icons = (
    <>
      {[...Array(totalStars)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              className="d-none"
              type="radio"
              name="rating"
              value={ratingValue}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={25}
            />
          </label>
        );
      })}
    </>
  );

  return to_rate ? rating_actions : show_icons;
};

export default StarRating;
