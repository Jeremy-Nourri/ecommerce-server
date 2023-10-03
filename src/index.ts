import express from 'express';
import cors from 'cors';
import router from './routes/router';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(router);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello world');
});

app.listen(4000, () => {
  console.log('API is running on port 4000');
});
