import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import PingRouter from './ping';
import HealthRouter from './health';
import ShortLikRouter from './shortLink';
import path from 'path';

// Export the base-router
const baseRouter = Router();
// swaggerUi
baseRouter.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

baseRouter.use(
  '/404',
  (_req, res) => {
    res.sendFile(path.resolve('public/404.html'));
  }
);

baseRouter.use('/ping', PingRouter);
baseRouter.use('/api/health', HealthRouter);
baseRouter.use('/api', ShortLikRouter);



export default baseRouter;
