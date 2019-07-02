import React from 'react';
import Carousel from '../../Components/Carousel/';
import './index.scss';
export default function() {
  return (
    <Carousel className="carousel" interval={2000}>
      <div key="red" className="carousel_item red"></div>
      <div key="black" className="carousel_item black"></div>
      <div key="red" className="carousel_item red"></div>
      <div key="black" className="carousel_item black"></div>
      <div key="red" className="carousel_item red"></div>
      <div key="black" className="carousel_item black"></div>
      <div key="red" className="carousel_item red"></div>
      <div key="green" className="carousel_item green"></div>
    </Carousel>
  );
}
