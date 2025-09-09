import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setAllTodo: (todos: Todo[]) => void;
};

export const TodoFilter: React.FC<Props> = ({ todos, setAllTodo }) => {
  const [inputValue, setInputVale] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVale(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  useEffect(() => {
    switch (selectValue) {
      case 'all':
        setAllTodo(
          [...todos].filter(todo => {
            return todo.title.toLowerCase().includes(inputValue.toLowerCase());
          }),
        );
        break;
      case 'active':
        setAllTodo(
          [...todos]
            .filter(todo => {
              return todo.completed === false;
            })
            .filter(todo => {
              return todo.title
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }),
        );
        break;
      case 'completed':
        setAllTodo(
          [...todos]
            .filter(todo => {
              return todo.completed === true;
            })
            .filter(todo => {
              return todo.title
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }),
        );
        break;
    }
  }, [selectValue, inputValue]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectValue}
            data-cy="statusSelect"
            onChange={handleSelect}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={inputValue}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setInputVale('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
