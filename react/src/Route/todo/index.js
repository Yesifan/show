import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import TodoItem from './todo-item';
import TodoModel from '../../model/todo/todo';
const ENTER_KEY = 13;

class TodoList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      newTodo:'',
      editor:false,
      todos: [
        {
          id:'asdf',
          completed:false,
          text:'text',
        },
      ]
    };

    this.model = new TodoModel(this);
  };

  componentDidMount () {
    this.model.init();
    let {match,history} = this.props;
    if(!/^(all|active|completed)$/.test(match.params.filter) || !match.isExact) history.push('/todo/all');
  }

  handleChange = event => {
    this.setState({newTodo: event.target.value});
  }

  handleNewTodoKeyDown = event => {
    if (event.keyCode !== ENTER_KEY) return;

    event.preventDefault();

    const val = this.state.newTodo.trim();

    if (val) {
      this.model.addTodo(val);
      this.setState({newTodo: ''});
    }
  }

  itemToggle = id => this.model.statusChange(id)

  itemDestroy = id => this.model.delete(id);

  itemEdit = (id,e) => {
    let target = e.target;
    this.setState({editor:id},()=>target.focus());
    // console.log(e.target);
  }

  itemSubmit = (id,text) => {
    this.model.save(id,text);
    this.setState({editor:false});
  }

  render () {
    let todoItem;
    let {match} = this.props;

    if (this.state.todos.length) {
      todoItem = this.state.todos.filter(
        todo => {
          if(match.params.filter === 'all') return true;
          return todo.completed === (match.params.filter === 'completed');
        }
      )
        .map(
          todo => <TodoItem
            key = {todo.id} todo={todo}
            editing = {todo.id === this.state.editor}
            onEditor = {this.itemEdit}
            onSubmit = {this.itemSubmit}
            onToggle = {this.itemToggle}
            onDestroy = {this.itemDestroy}/>
        );
    }
    return (
      <main className='main'>
        <header className="header">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            autoFocus={true} />
        </header>
        {todoItem}
        <footer className="footer">
          <ul className="filters">
            <li className={classNames({selected: match.params.filter === 'all'})}><Link to={'./all'}>All</Link></li>
            <li className={classNames({selected: match.params.filter === 'active'})}><Link to={'./active'}>Active</Link></li>
            <li className={classNames({selected: match.params.filter === 'completed'})}><Link to={'./completed'}>Completed</Link></li>
          </ul>
        </footer>
      </main>
    );
  }
}

export default TodoList;