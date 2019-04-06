import Router from 'koa-router';
import config from '../config';
import Auth  from '../middleware/auth';
import UserCtrl  from '../controllers/user';

const router = new Router({
    prefix: config.api_path+'/users'
  });

router.use([Auth.session,Auth.isauthorized]);

router.post('/',UserCtrl.create);
router.put('/:id/',UserCtrl.update);
router.del('/:id/',UserCtrl.delete);
router.get('/',UserCtrl.listall);
router.get('/:id/',UserCtrl.detail);

// User router
const routes = router.routes();

export default () => routes;
