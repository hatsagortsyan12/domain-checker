import express from 'express';
import config from 'config';
import './database/mysql';
import origin from './helpers/origin';
import fs from "fs/promises";
import * as csv from '@fast-csv/parse';
import './rabbitmq/amqp';
import task from './tasks/task';

const app: express.Express = express(),
  port: string = process.env.PORT || config.get("server.port");

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  origin(req, res);
  next();
});

// TODO: Replace with controller & combine uploaded chunks
app.get('/', async (req, res, next) => {
  try {
    const csvString = (await fs.readFile('./domains.csv'))
      .toString();

    const stream = csv.parse({ headers: true })
      .on('error', error => { throw error })
      .on('data', row => task(JSON.stringify(row)));

    stream.write(csvString);
    stream.end();

    return res.json({ success: 1 });
  } catch (error) {
    next(error);
  }
});

// Error handler middleware
app.use((error, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = error;

  // Render the error page
  res
    .status(error.status || 500)
    .json({ error: { message: error.message, data: error.data } });
});
