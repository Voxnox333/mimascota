import Router from 'koa-router';
import Auth  from '../middleware/auth';

const router = new Router({
    prefix: '/users'
  });

router.use(Auth.session);


// User router
const routes = router.routes();

export default () => routes;
