import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import { TYPES } from './config/types';
import { container } from './config/inversify.config';
import { ErrorMiddleware } from './middlewares/error.middleware';

// Set up the Inversify Express server
const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: '50mb' }));
});

const app = server.build();
const port = process.env.PORT || 3000;

// add the error middleware
const errorMiddleware = container.get<ErrorMiddleware>(TYPES.ErrorMiddleware);
app.use(errorMiddleware.handleError());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
