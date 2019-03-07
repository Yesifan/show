import React,{ Component,useState, useEffect, useRef, useMutationEffect  } from 'react';
import './Carousel.scss';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Item(props) {
  const {activeIndex,index,length,width} = props;
  const [translate, setTranslate] = useState(0);
  const [animating, setAnimating] = useState(false);
  const prevIndex = usePrevious(activeIndex);

  useEffect(() => {
    translateItem(index,activeIndex,prevIndex);
    /**
     * @param index - 此item的index
     * @param activeIndex - 下一个活动index
     * @param oldIndex - 上一个活动的index
     */
    function translateItem(index, activeIndex, oldIndex) {
      const parentWidth = width;

      if (oldIndex !== undefined) {
        if(index === activeIndex || index === oldIndex){
          setAnimating(true);
        }else{
          if(activeIndex===oldIndex&&(this.translate!==parentWidth||this.translate!==-parentWidth)){
            setAnimating(true);
          }else{
            setAnimating(false);
          }
        }
      }
      if (index !== activeIndex && length > 2) {
        index = processIndex(index, activeIndex, length);
      }
      setTranslate(parentWidth * (index - activeIndex));

      function processIndex(index, activeIndex, length) {
        if (activeIndex === 0 && index === length - 1) {
          return -1;
        } else if (activeIndex === length - 1 && index === 0) {
          return length;
        } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
          return length + 1;
        } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
          return -2;
        }
        return index;
      };
    };
  },[props.activeIndex]);

  return (
    <div className={`carousel-item ${animating?'animating':''}`} style={{transform: `translateX(${ translate }px)`}}>
      {props.children}
    </div>
  );
}


function Carousel(props){
  const [activeIndex, setIndex] = useState(0);
  const { children } = props;
  const main = useRef();
  const { offsetWidth } = main.current||0;
  useEffect(() => {
    let index = activeIndex + 1;
    index = index >= children.length?0:index;
    const interval = setTimeout(()=>{setIndex(index)},1000);
    return ()=>clearTimeout(interval)
  });

  const item = children.map( (e, index) => 
    <Item key={index} index={index} width={offsetWidth} length={children.length} activeIndex={activeIndex}>
      {[e]}
    </Item>);
  return <section {...props} ref={main}>
    {item}
  </section>
}



export default Carousel;