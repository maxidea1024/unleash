import { writeHeapSnapshot } from 'v8';
import { tmpdir } from 'os';
import { join } from 'path';
import { register as prometheusRegister } from 'prom-client';
import Controller from './controller';
import type { IGanpaConfig } from '../types/options';
import type { Logger } from '../logger';

export class BackstageController extends Controller {
  private readonly logger: Logger;

  constructor(config: IGanpaConfig) {
    super(config);

    this.logger = config.getLogger('backstage.ts');

    if (config.server.serverMetrics) {
      this.get('/prometheus', async (req, res) => {
        res.set('Content-Type', prometheusRegister.contentType);
        res.end(await prometheusRegister.metrics());
      });
    }

    if (config.server.enableHeapSnapshotEnpoint) {
      this.get('/heap-snapshot', async (req, res) => {
        const fileName = join(tmpdir(), `unleash-${Date.now()}.heapsnapshot`);
        writeHeapSnapshot(fileName);
        res.status(200);
        res.end('Snapshot written');
      });
    }
  }
}
