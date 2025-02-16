import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createTodo, getTodos, USER_ID } from './api/todos';
import {
  ErrorNotification,
  Footer,
  Header,
  Navigation,
  TodoItem,
  TodoList,
} from './components';
import { Todo } from './types';

import React from 'react';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFiltered, setTodosFiltered] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

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

  const handleShowError = useCallback((err: string) => setError(err), []);
  const handleHideError = useCallback(() => setError(''), []);

  const handleAddTodo = useCallback(
    async (title: Todo['title']) => {
      try {
        setIsAddingTodo(true);

        const newTodo: Omit<Todo, 'id'> = {
          title,
          userId: USER_ID,
          completed: false,
        };

        setTempTodo({ ...newTodo, id: 0 });

        const createdTodo = await createTodo(newTodo);

        if (createdTodo) {
          setTodos(prev => [...prev, createdTodo]);

          if (titleRef.current) {
            titleRef.current.value = '';
          }
        }
      } catch (err) {
        handleShowError('Unable to add a todo');
      } finally {
        setIsAddingTodo(false);
        setTempTodo(null);
      }
    },
    [handleShowError],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isLoading={isAddingTodo}
          todos={todos}
          titleRef={titleRef}
          onShowError={handleShowError}
          onFormSubmit={handleAddTodo}
        />

        <TodoList>
          {todosFiltered.map(todo => (
            <TodoItem key={todo.id} todo={todo} isLoading={false} />
          ))}

          {tempTodo ? (
            <TodoItem todo={tempTodo} isLoading={isAddingTodo} />
          ) : null}
        </TodoList>

        <Footer isShowFooter={!!todos.length} itemsLeft={todosActive.length}>
          <Navigation todos={todos} onFilter={handleFilterClick} />
        </Footer>
      </div>

      <ErrorNotification error={error} onHideError={handleHideError} />
    </div>
  );
};
