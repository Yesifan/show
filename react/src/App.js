import React, { Component } from 'react';
import TodoList from './Components/todo/todo-list';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/todo/:filter" component={TodoList} />
      </Router>
    );
  }
}

export default App;
