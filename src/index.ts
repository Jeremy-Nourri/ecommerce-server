import express from 'express';
import cors from 'cors';
import router from './routes/router';
import credentials from './middlewares/credentials';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');

const app = express();

app.use(credentials);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

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
