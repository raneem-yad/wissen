import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ to_rate, rating_value , rating_count }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const totalStars = 5;
  useEffect(() => {
    // Set the initial rating based on the rating_value prop
    setRating(rating_value);
  }, [rating_value]);

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
              size={20}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
      
      &nbsp;{rating_value}
    </>
  );

  const show_icons = (
    <>
      {[...Array(totalStars)].map((star, index) => {
        const ratingValue = rating;

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
