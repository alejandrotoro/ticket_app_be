import Router from 'koa-router';
import { Auth } from './controllers/auth/auth';

export function registerRoutes() {
  const router = new Router();

  // router.get
  // router.post
  
  // Auth routes
  router.post('/register', Auth.prototype.create);
  router.post('/login', Auth.prototype.login);
  return router;
}