import { v4 } from 'uuid';
import Immutable from "immutable";
export default class TodoModel{
  constructor(that){
    this.react = that;
    this._todos = Immutable.fromJS(that.state.todos);
  }

  get todos(){
    return this._todos;
  }

  addTodo(text){
    this.react.setState(function(prevState) {
      const $$todos = Immutable.fromJS(prevState.todos||[]).push({
        id:v4(),
        completed:false,
        text:text,
      })
      return {
        todos: $$todos.toJS()
      };
    });
  }

  delete(id){
    this.react.setState(function(prevState) {
      const $$todos = Immutable.fromJS(prevState.todos);
      const index = $$todos.findIndex(value => value.getIn&&value.getIn(['id']) === id);
      return {
        todos: $$todos.delete(index).toJS()
      };
    });
  }

  statusChange(id){
    this.react.setState(function(prevState) {
      const $$todos = Immutable.fromJS(prevState.todos);
      const index = $$todos.findIndex(value => value.getIn&&value.getIn(['id']) === id);
      return {
        todos: $$todos.setIn([index,'completed'],!$$todos.getIn([index,'completed'])).toJS()
      };
    });
  }
}