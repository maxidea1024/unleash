import Controller from '../controller';
import FeatureController from '../../features/client-feature-toggles/client-feature-toggle.controller';
import MetricsController from '../../features/metrics/instance/metrics';
import RegisterController from '../../features/metrics/instance/register';
import type { IGanpaConfig, IGanpaServices } from '../../types';

export default class ClientApiController extends Controller {
  constructor(config: IGanpaConfig, services: IGanpaServices) {
    super(config);

    this.use('/features', new FeatureController(services, config).router);
    this.use('/metrics', new MetricsController(services, config).router);
    this.use('/register', new RegisterController(services, config).router);
  }
}
