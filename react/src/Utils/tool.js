export function delay(amount = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, amount);
  });
}

export function getImage(src) {
  if (typeof src === 'string') {
    const img = document.createElement('img');
    img.src = src;
    return new Promise(resolve => (img.onload = () => resolve(img)));
  }
  return Promise.resolve();
}

/** 计算index相对于activeIndex的位置
 * @param {Number} index 当前序号
 * @param {Number} activeIndex 活动序号
 * @param {Number} length 总长度
 * @returns {Number} 相对位置
 */
export function processIndex(index, activeIndex, length) {
  if (index === undefined) return undefined;
  const _index = index - activeIndex;
  if (_index > length / 2) return _index - length;
  else if (_index < -length / 2) return _index + length;
  return _index;
}
