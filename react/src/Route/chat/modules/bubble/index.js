import React,{Component} from 'react';
import './index.scss';

export class Bubble extends Component{
  render() {
    const {left,children} = this.props;
    const content = children.type === 'img'?<img src={children.src} alt='聊天'/>:children;
    return (
      <div className={['bubble', left?'left':'right'].join(' ')}>
        <span>{content}</span>
      </div>
    );
  }
}


export default Bubble;