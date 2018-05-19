import { v4 } from 'uuid';
export default class TodoModel{
  constructor(that){
    this.react = that;
    this._todos = that.state.todos;
  }

  get todos(){
    return this._todos;
  }

  addTodo(text){
    this.react.setState(function(prevState) {
      return {
        todos: [...prevState.todos,{
          id:v4(),
          completed:false,
          text:text,
        }]
      };
    });
  }
}