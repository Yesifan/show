import React, { Component } from 'react';
import TodoList from './Components/todo/todo-list';
import Nope from "./Components/404/index";
import { HashRouter as Router, Redirect, Switch, Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/todo/:filter" component={TodoList} />
          <Redirect from="/todo" to="/todo/all" />          
          <Route component={Nope} />
        </Switch>
      </Router>
    );
  }
}

export default App;
