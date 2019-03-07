import React,{Component} from 'react';
import Carousel from "../../Components/Carousel/";
import './index.css'
export default function() {
  return (
    <Carousel className='carousel'>
      <div className='carousel_item red'></div>
      <div className='carousel_item black'></div>
      <div className='carousel_item green'></div>
    </Carousel>
  )
}