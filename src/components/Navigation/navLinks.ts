import { ActiveFilter } from '../../types';

type NavLink = {
  title: Capitalize<ActiveFilter>;
  href: Extract<ActiveFilter, 'active' | 'completed'> | '';
  filter: ActiveFilter;
  dataCy: `FilterLink${Capitalize<ActiveFilter>}`;
};

export const navLinks: NavLink[] = [
  {
    title: 'All',
    href: '',
    dataCy: 'FilterLinkAll',
    filter: 'all',
  },
  {
    title: 'Active',
    href: 'active',
    dataCy: 'FilterLinkActive',
    filter: 'active',
  },
  {
    title: 'Completed',
    href: 'completed',
    dataCy: 'FilterLinkCompleted',
    filter: 'completed',
  },
];
