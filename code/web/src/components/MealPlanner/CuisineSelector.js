import React, { useState } from 'react';
import Slider from 'react-slick';
import './CuisineSelector.css'; // create this for custom styling

const cuisines = [
  { name: 'Indian', img: '/images/indian.jpeg' },
  { name: 'Italian', img: '/images/italian.jpeg' },
  { name: 'Chinese', img: '/images/chinese.jpeg' },
  { name: 'Mexican', img: '/images/mexican.jpeg' },
  { name: 'Thai', img: '/images/thai.jpeg' },
  // Add more if needed
];

function CuisineSelector({ onSelect }) {
  const [selected, setSelected] = useState([]);

  const toggleCuisine = (cuisine) => {
    const newSelection = selected.includes(cuisine)
      ? selected.filter((c) => c !== cuisine)
      : [...selected, cuisine];
    setSelected(newSelection);
    onSelect(newSelection); // callback to MealPlanner
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
<div className="cuisine-selector-container">
  <h3 className="section-title">🍽️ Select Preferred Cuisines</h3>
  <Slider {...settings}>
    {cuisines.map(({ name, img }) => (
      <div
        key={name}
        className={`cuisine-card ${selected.includes(name) ? "selected" : ""}`}
        onClick={() => toggleCuisine(name)}
      >
        <div className="cuisine-img-wrapper">
          <img src={img} alt={name} />
          <div className="cuisine-overlay">

          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>
  );
}

export default CuisineSelector;