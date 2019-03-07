import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route } from "react-router-dom";

import TodoList from './Route/todo';
import Swiper from "./Route/Swiper";
import Carousel from "./Route/Carousel";
import Chat from "./Route/chat";
import Nope from "./Route/404/index";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/todo/:filter" component={TodoList} />
          <Route exact path="/carousel" component={Carousel} />
          <Route exact path="/swiper" component={Swiper} />
          <Route exact path="/chat" component={Chat} />
          <Redirect from="/todo" to="/todo/all" />          
          <Route component={Nope} />
        </Switch>
      </Router>
    );
  }
}

export default App;
