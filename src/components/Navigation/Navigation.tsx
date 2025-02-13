import { FC, memo, useEffect, useMemo, useState } from 'react';
import { ActiveFilter, Todo } from '../../types';
import classNames from 'classnames';
import React from 'react';
import { navLinks } from './navLinks';
import { makeFilterTodos } from './utils';

type Props = {
  todos: Todo[];
  onFilter: (todos: Todo[]) => void;
};

export const Navigation: FC<Props> = memo(({ todos, onFilter }) => {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>('all');

  const todosFiltered = useMemo(
    () => makeFilterTodos(todos, activeFilter),
    [activeFilter, todos],
  );

  useEffect(() => {
    onFilter(todosFiltered);
  }, [onFilter, todosFiltered]);

  return (
    <nav className="filter" data-cy="Filter">
      {navLinks.map(({ title, href, filter, dataCy }) => (
        <a
          href={`#/${href}`}
          data-cy={dataCy}
          key={title}
          className={classNames('filter__link ', {
            selected: activeFilter === filter,
          })}
          onClick={() => setActiveFilter(filter)}
        >
          {title}
        </a>
      ))}
    </nav>
  );
});

Navigation.displayName = 'NavigationMemo';
