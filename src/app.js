// const config = require('config')
import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import koaValidator from 'koa-async-validator';
import config from './config';
import router from './router';
import db from './middleware/database';
import json from 'koa-json';

console.info(`ROOT_PATH: ${config.ROOT_PATH}`);

const app = new Koa();

// sequelize & squel
app.use(db);

// rest logger
app.use(logger());
app.use(bodyParser());
app.use(koaValidator());
app.use(json())

// x-response-time
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// Format Json errors
app.use(async (ctx, next)=> {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.type = 'json';
    ctx.body ={message:err.message};
  }
});

app.use(router());


app.listen(process.env.PORT || 3000);
console.info(`Node ${process.version} : ${config.NODE_ENV} listening on port ${process.env.PORT || 3000}`);
