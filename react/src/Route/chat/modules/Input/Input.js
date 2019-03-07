import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'; 
import './input.scss';

const Select = ({options,send})=>{
  let Options,type;
  if(!options) return null;
  if(options instanceof Array){
    type = 'qustion';
    Options = options.map((item,index)=>
      <div className='__select_item' key={index} onClick={()=>send(item)}>
        {item.dialog}
      </div>
    )
  }else{
    type = 'brief';
    Options = Object.keys(options).map((key,index)=>
      <div className='__select_item' key={index} onClick={()=>send(options[key])}>
        {options[key].brief}
      </div>
    )
  }
  return (
    <div className={['__select',type].join(' ')}>
      {Options}
    </div>
  )
}

export class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      show:false
    }
  }
  handleClick = ()=>{
    this.setState((prevState=>({show:!prevState.show})))
  };
  handleSend = (msg) => {
    this.setState({show:false});
    this.props.sendMessage(msg);
  }
  render() {
    const {children,dialog} = this.props;
    const {show} = this.state;
    return (
      <div className='select-input'>
        <CSSTransition in={show} timeout={300} classNames="select" unmountOnExit>
          <Select options={dialog} send={this.handleSend}/>
        </CSSTransition>
        <div className='__input'  onClick={this.handleClick}>{children}</div>
      </div>
    );
  }
}

export default Input;