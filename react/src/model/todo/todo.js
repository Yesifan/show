import { v4 } from 'uuid';
import Immutable from "immutable";
const store = 'y-todos';
export default class TodoModel{
  constructor(that){
    this.react = that;
    this._todos = JSON.parse(localStorage.getItem(store))||[];
  }

  init(){
    this.react.setState({todos:this._todos})
  }

  update(){
    console.log(this._todos);
    localStorage.setItem(store,JSON.stringify(this._todos))
  }

  addTodo(text){
    this.react.setState((prevState) => {
      const $$todos = Immutable.fromJS(prevState.todos||[]).push({
        id:v4(),
        completed:false,
        text:text,
      })
      this._todos = $$todos.toJS();
      return {
        todos: this._todos
      };
    },()=>this.update());

  }

  save(id,text){
    if(!text) return this.delete(id);
    const $$todos = Immutable.fromJS(this._todos);
    const index = $$todos.findIndex(value => value.getIn&&value.getIn(['id']) === id);
    this._todos = $$todos.setIn([index,'text'],text).toJS();
    this.react.setState({
        todos: this._todos
    },()=>this.update());
  }

  delete(id){
    this.react.setState((prevState) => {
      const $$todos = Immutable.fromJS(prevState.todos);
      const index = $$todos.findIndex(value => value.getIn&&value.getIn(['id']) === id);
      this._todos = $$todos.delete(index).toJS();
      return {
        todos: this._todos
      };
    },()=>this.update());
  }

  statusChange(id){
    this.react.setState((prevState) => {
      const $$todos = Immutable.fromJS(prevState.todos);
      const index = $$todos.findIndex(value => value.getIn&&value.getIn(['id']) === id);
      this._todos = $$todos.setIn([index,'completed'],!$$todos.getIn([index,'completed'])).toJS();
      return {
        todos: this._todos
      };
    },()=>this.update());
  }
}