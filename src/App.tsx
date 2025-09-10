/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<number>(0);
  const [todo, setTodo] = useState<Todo | undefined>();
  const [allTodo, setAllTodo] = useState<Todo[]>([]);
  const [inputValue, setInputVale] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setAllTodo(todosFromServer);
      })
      .catch(() => {
        setErrorMessage('try again later');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    switch (selectValue) {
      case 'all':
        setAllTodo(
          [...todos].filter(todoForFillter => {
            return todoForFillter.title
              .toLowerCase()
              .includes(inputValue.toLowerCase());
          }),
        );
        break;
      case 'active':
        setAllTodo(
          [...todos]
            .filter(todoForFillter => {
              return todoForFillter.completed === false;
            })
            .filter(todoForFillter => {
              return todoForFillter.title
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }),
        );
        break;
      case 'completed':
        setAllTodo(
          [...todos]
            .filter(todoForFillter => {
              return todoForFillter.completed === true;
            })
            .filter(todoForFillter => {
              return todoForFillter.title
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            }),
        );
        break;
    }
  }, [selectValue, inputValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectValue={setSelectValue}
                setInputVale={setInputVale}
                selectValue={selectValue}
                inputValue={inputValue}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {allTodo.length > 0 && !errorMessage && (
                <TodoList
                  todos={allTodo}
                  onSelectUserId={setSelectedTodo}
                  onSelectTodo={setTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && todo && (
        <TodoModal
          userId={selectedTodo}
          onSelectUserId={setSelectedTodo}
          todo={todo}
        />
      )}
    </>
  );
};
