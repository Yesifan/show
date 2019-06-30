import React, { useState, useEffect } from 'react';
import { usePrevious } from '../../Utils/tool';
import './Carousel.scss';

function Item(props) {
  const { activeIndex, index, length } = props;
  const [translate, setTranslate] = useState(100 * (index - activeIndex));
  const [animating, setAnimating] = useState(false);
  const prevIndex = usePrevious(activeIndex);
  useEffect(() => {
    translateItem(index, activeIndex, prevIndex);
    /**
     * @param index - 此item的index
     * @param activeIndex - 下一个活动index
     * @param prevIndex - 上一个活动的index
     */
    function translateItem(index, activeIndex, prevIndex) {
      if (prevIndex !== undefined && activeIndex !== prevIndex) {
        if (index === activeIndex || index === prevIndex) {
          setAnimating(true);
        } else {
          setAnimating(false);
        }
      }
      if (index !== activeIndex && length > 2) {
        index = processIndex(index, activeIndex, length);
      }
      setTranslate(100 * (index - activeIndex));

      function processIndex(index, activeIndex, length) {
        if (activeIndex === 0 && index === length - 1) {
          return -1;
        } else if (activeIndex === length - 1 && index === 0) {
          return length;
        } else if (
          index < activeIndex - 1 &&
          activeIndex - index >= length / 2
        ) {
          return length + 1;
        } else if (
          index > activeIndex + 1 &&
          index - activeIndex >= length / 2
        ) {
          return -2;
        }
        return index;
      }
    }
  }, [activeIndex, index, length, prevIndex, translate]);

  return (
    <div
      className={`carousel-item ${animating ? 'animating' : ''}`}
      style={{ transform: `translateX(${translate}%)` }}>
      {props.children}
    </div>
  );
}

function Carousel(props) {
  const [activeIndex, setIndex] = useState(0);
  const { children } = props;
  useEffect(() => {
    let index = activeIndex + 1;
    index = index >= children.length ? 0 : index;
    const interval = setTimeout(() => {
      setIndex(index);
    }, 1000);
    return () => clearTimeout(interval);
  }, [activeIndex, children]);

  const item = children.map((ele, index) => (
    <Item
      key={index}
      index={index}
      length={children.length}
      activeIndex={activeIndex}>
      {ele}
    </Item>
  ));
  return <section {...props}>{item}</section>;
}

export default Carousel;
