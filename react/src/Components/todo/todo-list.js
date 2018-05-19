import React, { Component } from 'react';
import TodoItem from "./todo-item";
import TodoModel from "../../model/todo/todo";
const ENTER_KEY = 13;

class TodoList extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo:'',
      todos: [
        {
          id:'asdf',
          completed:false,
          text:'text',
        },
      ]
    }

    this.model = new TodoModel(this);    
  };
  
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

  render() {
    let todoItem;
    if (this.state.todos.length) {
      todoItem = this.state.todos.map(
        todo => <TodoItem 
        key={todo.id} todo={todo} 
        onToggle={()=>this.itemToggle(todo.id)}  
        onDestroy = {() => this.itemDestroy(todo.id)}/>
      )
    }
    return (
      <main className='main'>
        <header className="header">
          <h1 id='title'>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            autoFocus={true} />
				</header>
        {todoItem}
      </main>
    );
  }
}

export default TodoList;