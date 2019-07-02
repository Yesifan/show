import React, { useState, useEffect, useRef } from 'react';
import { usePrevious } from '../../Utils/hooks';
import { processIndex } from '../../Utils/tool';

import styles from './index.module.scss';

function Item(props) {
  const { activeIndex, index, length, move } = props;
  const [translate, setTranslate] = useState(100 * (index - activeIndex));
  const [animating, setAnimating] = useState(false);
  const prevIndex = usePrevious(activeIndex);

  const _activeIndex = 0;
  const _index = processIndex(index, activeIndex, length);
  const _prevIndex = processIndex(prevIndex, activeIndex, length);

  useEffect(() => {
    if (move) setAnimating(false);
    else if (_activeIndex === _prevIndex) {
      if (translate % 100) setAnimating(true);
    } else if (_prevIndex !== undefined) {
      if (_activeIndex > _prevIndex) {
        if (_index <= _activeIndex && _index >= _prevIndex) setAnimating(true);
        else setAnimating(false);
      } else if (_activeIndex < _prevIndex) {
        if (_index <= _prevIndex && _index >= _activeIndex) setAnimating(true);
        else setAnimating(false);
      }
    } else if (_index === 0) setAnimating(true);

    setTranslate(100 * _index - move);
  }, [_index, _prevIndex, move, translate]);

  return (
    <div
      className={`carouselItem ${animating ? 'animating' : ''}`}
      style={{ transform: `translateX(${translate}%)` }}>
      {animating ? props.children : ''}
    </div>
  );
}

function Point({ length, active, onSelect }) {
  const items = [];
  for (let i = 0; i < length; i++) {
    items.push(
      <li
        key={i}
        className={active === i ? 'active' : ''}
        onClick={e => onSelect(i, e)}
      />
    );
  }
  return <ul className="nav">{items}</ul>;
}

export default function Carousel(props) {
  const timer = useRef(0);
  const main = useRef();
  const prevMove = useRef();
  const [move, setMove] = useState(0);
  const [activeIndex, setIndex] = useState(0);
  const { offsetWidth } = main.current || 0;
  const { children, interval = 1000 } = props;

  function handleSelect(i) {
    setIndex(i);
  }

  function handleTouchStart(e) {
    prevMove.current = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    const { clientX } = e.touches[0];
    setMove(((prevMove.current - clientX) / offsetWidth) * 100);
  }

  function handleTouchEnd() {
    if (move > 100 / 4)
      setIndex(index => (index + 1 >= children.length ? 0 : index + 1));
    else if (move < -100 / 4)
      setIndex(index => (index - 1 < 0 ? children.length - 1 : index - 1));
    setMove(0);
  }

  useEffect(() => {
    clearTimeout(timer.current);
    if (!move) {
      timer.current = setTimeout(() => {
        setIndex(index => (index + 1 >= children.length ? 0 : index + 1));
      }, interval);
    }
    return () => clearTimeout(timer.current);
  }, [interval, activeIndex, children, move]);

  const item = children.map((ele, index) => (
    <Item
      key={index}
      move={move}
      index={index}
      length={children.length}
      activeIndex={activeIndex}>
      {ele}
    </Item>
  ));
  return (
    <section
      {...props}
      className={`${styles.carousel} ${props.className}`}
      ref={main}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      {item}
      <Point
        onSelect={handleSelect}
        active={activeIndex}
        length={children.length}
      />
    </section>
  );
}
