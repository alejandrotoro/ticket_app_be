import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import koaCors from 'koa2-cors';

import { registerRoutes } from './routes';

async function serverSetUp() {
  const server: Koa = new Koa();
  middleWares(server);
  await startServer(server);
}

function middleWares(server: Koa) {
  server.use(bodyParser());
  server.use(koaCors());

  const routes = registerRoutes().routes();
  server.use(routes);
}

async function startServer(server: Koa) {
  try {
    const serverPort = 5000;
    const serverStarted: Promise<void> = new Promise((resolve) => {
      server.listen(serverPort, resolve);
    });
    await serverStarted;
    console.log(`Server running on port ${serverPort}`);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { serverSetUp };
