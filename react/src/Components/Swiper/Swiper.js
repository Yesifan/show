import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { Expo } from '../../Utils/Tween';
import './Swiper.css';


class Swiper extends Component {
  constructor(props){
    super(props);
    this.animation;
    this.state = {
      translate: -100 * props.i
    };
  }

  componentDidUpdate({i: prevI},{translate}){
    if (prevI !== this.props.i){
      cancelAnimationFrame(this.animation);
      this.swiper(translate,0);
    }
  }

  swiper(from,befor){
    const { translate } = this.state;
    const { i,time } = this.props;
    const now = befor + 1;
    const to = i * -100;

    const _translate = Expo.easeOut(now,from,to - from,time);
    this.setState({translate: _translate},() => {
      if (to !== this.state.translate)
        this.animation = requestAnimationFrame(() => this.swiper(from,now));
    });
  }

  renderSwiper(e,index){
    const { translate } = this.state;
    const _translate = translate + index * 100;
    if (_translate > -100 && _translate < 100)
      return (
        <div key={ index } style={{transform: `translateY(${_translate}%)`}} >
          {e}
        </div>
      );
  }

  render() { 
    const {children,style,className} = this.props;
    const _children = Array.isArray(children)?children:[children]
    const item = _children.map( (e, index) => this.renderSwiper(e,index));

    return (
      <section {...this.props} className={`wrapper ${className||''}`.trim()}>
        {item}
      </section>
    );
  }

  componentWillUnmount(){
    cancelAnimationFrame(this.animation);
  }
}

Swiper.propTypes = {
  // name: PropTypes.string,
  children: PropTypes.any,
  i: PropTypes.number,
  time: PropTypes.number,
  className: PropTypes.string
};

Swiper.defaultProps = {
  i: 0,
  time: 200,
};



export default Swiper;