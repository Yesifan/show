import React from 'react';
import classNames from 'classnames';
import './todo.css';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const TodoItem = ({todo,onToggle,onDestroy,onEditor,onSubmit,editing}) => {
    const handleKeyDown = e =>{
        if (e.which === ENTER_KEY) onSubmit(todo.id,e.target.innerHTML)
        else if (e.which === ESCAPE_KEY) onDestroy(todo.id)
        
    }
    return(
        <li className={classNames({
            'completed': todo.completed,
            'todo-item':true})} >
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={()=>onToggle(todo.id)}
                />
                <label contentEditable={editing}
                    onKeyDown={handleKeyDown}
                    onBlur = {e => onSubmit(todo.id,e.target.innerHTML)}
                    onDoubleClick = {e => onEditor(todo.id,e)}
                    dangerouslySetInnerHTML={{__html: todo.text}} >
                </label>
                <button className="destroy" onClick={()=>onDestroy(todo.id)} />
            </div>
        </li>
    )}

export default TodoItem;