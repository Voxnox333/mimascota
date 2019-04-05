import compose from 'koa-compose';

import user from './user';
import sync from './sync';
import auth from './auth';

export default () => compose([
  user(),
  sync(),
  auth()
]);
