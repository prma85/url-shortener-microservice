import app from './server';
import logger from './utils/logger';
import { PORT, database } from './config';
import { createServer } from 'http';

// Start the server
database.init();

const httpServer = createServer(app)
httpServer.listen(PORT, () => {
  logger.info('Express server started on port: ' + PORT);
});
