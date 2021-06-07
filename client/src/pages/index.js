import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import { Layout } from '../components';
/** importing our pages */
import Users from './users';
import Organizations from './organizations';

export default function Pages() {
  return (
    <Layout>
      <Router primary={false} component={Fragment}>
        <Users path="/users" />
        <Organizations path="/organizations" />
      </Router>
    </Layout>
  );
}
