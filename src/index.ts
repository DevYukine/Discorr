import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import compression from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import { RouteManager } from './structure/RouteManager';

const app = new Koa();
const router = new Router();
const routeManager = new RouteManager(router);

routeManager.registerRoutes();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

const port = Number(process.env.PORT ?? 8081);

app.listen({ port }, () => console.log(`Server ready at http://localhost:${port}`));
