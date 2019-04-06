import Router from 'koa-router';
import config from '../config';
import Auth  from '../middleware/auth';
import UserCtrl  from '../controllers/user';

const router = new Router({
    prefix: config.api_path+'/users'
  });

router.use([Auth.session,Auth.isauthorized]);


router.post('/',UserCtrl.create);

// User router
const routes = router.routes();

export default () => routes;
