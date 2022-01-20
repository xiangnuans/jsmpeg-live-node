import { lazy } from 'react';

export const routerConfig = [
  {
    path: '/home',
    component: lazy(() => import('@containers/home/home')),
    exact: true
  },
];
