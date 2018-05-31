import React,{Component} from 'react';
import Swiper from "../../Components/Swiper/";
import PropTypes from 'prop-types';
import './index.css'
export default class Carousel extends Component {
  constructor(props){
    super(props);
    this.interval;
    this.state = {
      index:1
    };
  }
  componentDidMount() {
    this.interval = this.swiper();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  swiper(){
    return setInterval(()=>{
      this.setState(({index}) => ({index:++index<=3-1?index:0}))
    },1000)
  }
  render(){
    const {index} = this.state;
     return (
      <Swiper ref='carousel' className='carousel' i={index}>
        <div className='carousel_item red'></div>
        <div className='carousel_item black'></div>
        <div className='carousel_item green'></div>
      </Swiper>
     )
  }
}