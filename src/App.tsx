/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getData } from './utils/httpClient';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState(0);
  const [todo, setTodo] = useState<Todo | undefined>();
  const [allTodo, setAllTodo] = useState<Todo[]>([]);

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');
    getData<Todo[]>('/todos.json')
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

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setAllTodo={setAllTodo} />
            </div>

            <div className="block">
              {loading && <Loader />}
              {allTodo.length > 0 && !errorMessage && (
                <TodoList todos={allTodo} getId={setUserId} getTodo={setTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {userId && todo && (
        <TodoModal userId={userId} getId={setUserId} todo={todo} />
      )}
    </>
  );
};
