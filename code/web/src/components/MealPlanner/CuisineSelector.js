import React, { useState } from 'react';
import Slider from 'react-slick';
import './CuisineSelector.css'; // create this for custom styling

const cuisines = [
  { name: 'Indian', img: '/images/indian.jpg' },
  { name: 'Italian', img: '/images/italian.jpg' },
  { name: 'Chinese', img: '/images/chinese.jpg' },
  { name: 'Mexican', img: '/images/mexican.jpg' },
  { name: 'Thai', img: '/images/thai.jpg' },
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
    <div>
      <h3>Select Cuisines</h3>
      <Slider {...settings}>
        {cuisines.map(({ name, img }) => (
          <div
            key={name}
            className={`cuisine-card ${selected.includes(name) ? 'selected' : ''}`}
            onClick={() => toggleCuisine(name)}
          >
            <img src={img} alt={name} />
            <div className="cuisine-name">{name}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CuisineSelector;