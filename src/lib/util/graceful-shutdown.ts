import type { Logger } from '../logger';
import type { IGanpa } from '../types/core';

export default function registerGracefulShutdown(
  unleash: IGanpa,
  logger: Logger,
): void {
  const closer = (signal: string) => async () => {
    try {
      logger.info(`Graceful shutdown signal (${signal}) received.`);

      await unleash.stop();

      logger.info('Ganpa has been successfully stopped.');

      process.exit(0);
    } catch (e) {
      logger.error('Unable to shutdown Ganpa. Hard exit!');

      process.exit(1);
    }
  };

  logger.debug('Registering graceful shutdown');

  process.on('SIGINT', closer('SIGINT'));
  process.on('SIGHUP', closer('SIGHUP'));
  process.on('SIGTERM', closer('SIGTERM'));
}
