import React, { useState } from 'react';
import Slider from 'react-slick';
import './CuisineSelector.css'; // create this for custom styling
import indianImg from '../../assets/images/indian.jpeg';
import italianImg from '../../assets/images/italian.jpeg';
import chineseImg from '../../assets/images/chinese.jpeg';
import mexicanImg from '../../assets/images/mexican.jpeg';
import thaiImg from '../../assets/images/thai.jpeg';

const cuisines = [
  { name: 'Indian', img: indianImg },
  { name: 'Italian', img: italianImg },
  { name: 'Chinese', img: chineseImg },
  { name: 'Mexican', img: mexicanImg },
  { name: 'Thai', img: thaiImg },
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