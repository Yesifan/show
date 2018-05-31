import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route } from "react-router-dom";

import TodoList from './Route/todo';
import Carousel from "./Route/Swiper";
import Nope from "./Route/404/index";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/todo/:filter" component={TodoList} />
          <Route exact path="/carousel" component={Carousel} />
          <Redirect from="/todo" to="/todo/all" />          
          <Route component={Nope} />
        </Switch>
      </Router>
    );
  }
}

export default App;
