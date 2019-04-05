import Router from 'koa-router';
import config from '../config';
import Auth  from '../middleware/auth';

const router = new Router({
    prefix: config.api_path
});

router.post('/login',Auth.authorized);

// Auth router
const routes = router.routes();

export default () => routes;
