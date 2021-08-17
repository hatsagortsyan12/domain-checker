import express from 'express';
import config from 'config';

const app: express.Express = express(),
  port: string = <string>process.env.PORT || <string>config.get("server.port");

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
