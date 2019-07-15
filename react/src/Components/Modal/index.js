import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Transition } from 'react-transition-group';

import styles from './index.module.scss';

function Mask(props = {}) {
  const { children, className = '' } = props;
  return (
    <div {...props} className={`${styles.mask} ${className}`}>
      {children}
    </div>
  );
}

class Modal extends Component {
  constructor(props) {
    super(props);
    this.timeout = 300;
    this.data = {
      confirm: false
    };
    this.state = {
      inProp: false
    };
  }
  componentDidMount() {
    this.setState({ inProp: true });
  }
  handleClose = (e, data = {}) => {
    if (e.target === e.currentTarget) {
      this.data = { confirm: true, ...data };
      this.setState({ inProp: false });
    }
  };
  render() {
    const { inProp } = this.state;
    const { children, next } = this.props;
    return (
      <Transition
        in={inProp}
        timeout={this.timeout}
        onExited={() => next(this.data)}>
        {state => (
          <Mask
            style={{ transition: `all ${this.timeout}ms` }}
            className={`${state}`}
            onClick={e => this.handleClose(e, { confirm: false })}>
            <div
              className={`${styles.content} ${state}`}
              style={{ transition: `all ${this.timeout}ms` }}>
              {children instanceof Function
                ? children(this.handleClose)
                : children}
            </div>
          </Mask>
        )}
      </Transition>
    );
  }
}

/** 弹出一个弹窗
 * @param {ReactNode|Element|Function} content
 * @param {Object} props 应用到Modal上的props
 * @returns {Promise}
 * @example 传入组件
 * Modal(<div>asdfasdf</div>,{className:''})
 * .then(({confirm})=>{
 *  if(confirm){
 *    // 表示用户点击了确定按钮
 *    // do something
 *  }else{
 *    // 表示用户点击了取消按钮
 *    // do something
 *  }
 * })
 * @example 传入组件方法
 * Modal(handleClose => (
 *   <div onClick={e => handleClose(e, { data: 'asdf' })}>asdf</div>
 * )).then(({confirm,data}) => {
 *   // do something
 * });
 */
export default function(content, props = {}) {
  return new Promise(resolve => {
    const root = document.createElement('div');
    ReactDOM.render(
      <Modal {...props} next={next}>
        {content}
      </Modal>,
      root
    );
    document.querySelector('#modal').append(root);
    function next({ confirm, ...data }) {
      ReactDOM.unmountComponentAtNode(root);
      root.remove();
      resolve({ confirm, data });
    }
  });
}
