import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import { Layout } from '../components';
/** importing our pages */
import Users from './users';
import Organizations from './organizations';
import Releases from './releases';
import Repositories from './repositories';

export default function Pages() {
  return (
    <Layout>
      <Router primary={false} component={Fragment}>
        <Users path="/users" />
        <Organizations path="/users" />
        <Releases path="/releases" />
        <Repositories path="/repositories" />
      </Router>
    </Layout>
  );
}
