import { start } from './lib/server-impl';

try {
  start();
} catch (error: unknown) {
  console.error(error);
  process.exit();
}
