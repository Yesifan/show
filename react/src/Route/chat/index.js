import React, { Component } from 'react';
import { delay, getImage } from '../../Utils/tool';
import './index.scss';

import { Input, Bubble } from './modules';
import Dialog from './dialog';

const Dot = () => [
  <div className="dot" key={1}></div>,
  <div className="dot" key={2}></div>,
  <div className="dot" key={3}></div>
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputing: false,
      dialog: [],
      options: []
    };
    this.$box = React.createRef();
    this.chatChain = Promise.resolve();
  }

  componentDidMount() {
    this.meMessage('0000');
  }

  meMessage = id => {
    const answer = Dialog.answer[id];
    return this.sendMessage(answer, true).then(() => {
      let _options = Dialog.qusition;
      if (answer.response) _options = answer.response;
      return this._setState({ options: _options });
    });
  };

  sendMessage = ({ dialog, next }, answer) => {
    const _dialog = dialog[Math.floor(Math.random() * dialog.length)]; // 随机获取
    let chatChain = this.chatChain.then(() =>
      this._setState({ options: null })
    );
    if (_dialog instanceof Array) {
      _dialog.forEach(msg => {
        chatChain = chatChain.then(() => this.pushMessage(msg, answer));
      });
    } else chatChain = chatChain.then(() => this.pushMessage(_dialog, answer));
    chatChain.then(() => {
      if (next) return this.meMessage(next);
    });
    return chatChain;
  };

  pushMessage = (msg, answer = false) => {
    const gradient = (msg, index = 0) => {
      return this._setState(prev => {
        const newDialog = [...prev.dialog];
        newDialog[newDialog.length - 1] =
          msg.type === 'img'
            ? { content: msg, answer }
            : { content: msg.slice(0, index), answer };
        return { dialog: newDialog };
      })
        .then(this.updateScroll)
        .then(() => delay(Math.random() * 80 + 70))
        .then(() => {
          if (index === msg.length || msg.type === 'img')
            return delay(Math.random() * 100 + 100);
          else return gradient(msg, ++index);
        });
    };

    const send = (msg, nodelay) => {
      return this._setState(prev => ({
        dialog: [...prev.dialog, { content: <Dot />, answer }]
      }))
        .then(this.updateScroll)
        .then(() =>
          nodelay
            ? 50
            : msg.type === 'img'
            ? getImage(msg.src)
            : delay(msg.length > 5 ? Math.min(100 * msg.length, 2000) : 0)
        )
        .then(() => gradient(msg));
    };

    let sendChain = Promise.resolve();

    if (typeof msg === 'string') {
      msg.split('\n').forEach((item, index) => {
        sendChain = sendChain.then(() => send(item.trim(), index !== 0));
      });
    } else sendChain.then(() => send(msg));

    return sendChain;
  };

  _setState = fun =>
    new Promise(resolve => {
      this.setState(fun, resolve);
    });

  updateScroll = () => {
    const node = this.$box.current;
    const { scrollHeight, scrollTop, clientHeight: height } = node;
    const distance = scrollHeight - height - scrollTop;
    const duration = 250;
    const startTime = Date.now();
    requestAnimationFrame(function step() {
      const p = Math.min(1, (Date.now() - startTime) / duration);
      node.scrollTop = scrollTop + distance * p;
      p < 1 && requestAnimationFrame(step);
    });
  };

  render() {
    const { dialog, options } = this.state;
    return (
      <div id="chat">
        {/* <header>叶思凡</header> */}
        <div className="box" ref={this.$box}>
          {dialog.map((item, index) => {
            if (item instanceof Object)
              return (
                <Bubble key={index} left={item.answer}>
                  {item.content}
                </Bubble>
              );
            return <Bubble key={index}>{item}</Bubble>;
          })}
        </div>
        <Input dialog={options} sendMessage={this.sendMessage}>
          {options ? '说点什么...' : '输入中...'}
        </Input>
      </div>
    );
  }
}
