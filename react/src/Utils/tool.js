import { useRef, useEffect } from 'react';

export function delay(amount = 0){
  return new Promise(resolve => {
      setTimeout(resolve, amount);
  });
}

export function getImage(src){
  if(typeof src === 'string'){
    const img = document.createElement('img');
    img.src = src;
    return new Promise( resolve => img.onload = () => resolve(img));
  }
  return Promise.resolve();
}

export function chain(){
  const chain = useRef();
  chain.current = Promise.resolve();
  return chain.current;
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}