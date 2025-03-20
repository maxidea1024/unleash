import EventSearchController from '../../../features/events/event-search-controller';
import FeatureSearchController from '../../../features/feature-search/feature-search-controller';
import type {
  Db,
  IGanpaConfig,
  IGanpaServices,
} from '../../../server-impl';
import Controller from '../../controller';

export class SearchApiController extends Controller {
  constructor(config: IGanpaConfig, services: IGanpaServices, db: Db) {
    super(config);

    this.app.use(
      '/features',
      new FeatureSearchController(config, services).router,
    );

    this.app.use('/events', new EventSearchController(config, services).router);
  }
}
