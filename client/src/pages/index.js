import React, { Fragment } from 'react';
import { Router } from '@reach/router';
/** importing our pages */
import Users from './users';

export default function Pages() {
  return (
    <Router primary={false} component={Fragment}>
      <Users path="/" />
    </Router>
  );
}
