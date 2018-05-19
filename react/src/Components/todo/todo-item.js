import React from 'react';
import classNames from 'classnames';
import './todo.css';

const TodoItem = ({todo,onDestroy,editing}) => 
    <li className='todo-item'>
        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                checked={todo.completed}
                // onChange={onToggle}
            />
            <label contentEditable={editing}>
                {todo.text}
            </label>
            <button className="destroy" onClick={onDestroy} />
        </div>
    </li>

export default TodoItem;