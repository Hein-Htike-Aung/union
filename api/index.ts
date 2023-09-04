import process from 'node:process';
import app from './app';
import logger from './src/utils/logger';
import { createServer } from 'http';
import { sequelize } from './src/models';

const port = process.env.PORT || 8080;

(async () => {
  try {
    const server = createServer(app);

    await sequelize.sync({ alter: true });
    server.listen(port, () => {
      logger.info(`Listening: http://localhost:${port}`);
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
})();
