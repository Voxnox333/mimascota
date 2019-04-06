import Router from 'koa-router';
import config from '../config';
import AuthCtrl  from '../controllers/auth';

const router = new Router({
    prefix: config.api_path
});

router.post('/login',AuthCtrl.authorized);

// Auth router
const routes = router.routes();

export default () => routes;
