import IEntityMaster from './IEntityMaster';
import IComponentMaster from './IComponentMaster';
import ISystemMaster from './ISystemMaster';
import { IViewport } from '@plasmastrapi/viewport';

export default interface IEngine {
  entities: IEntityMaster;
  components: IComponentMaster;
  systems: ISystemMaster;
  viewport: IViewport;

  once(): void;
  start(): void;
}
