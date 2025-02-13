import { useCallback, useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import {
  ErrorNotification,
  Footer,
  Header,
  Navigation,
  TodoList,
} from './components';
import { Todo } from './types';

import React from 'react';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFiltered, setTodosFiltered] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  const todosActive = useMemo(
    () => todos.filter(({ completed }) => !completed),
    [todos],
  );

  const handleFilterClick = useCallback(
    (todo: Todo[]) => setTodosFiltered(todo),
    [],
  );

  const handleHideError = useCallback(() => setError(''), []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <TodoList todos={todosFiltered} />
        <Footer isShowFooter={!!todos.length} itemsLeft={todosActive.length}>
          <Navigation todos={todos} onFilter={handleFilterClick} />
        </Footer>
      </div>

      <ErrorNotification error={error} onHideError={handleHideError} />
    </div>
  );
};
