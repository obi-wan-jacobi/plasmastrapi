import { IViewport } from '@plasmastrapi/viewport';
import ISystem from './ISystem';
import IEntityMaster from './IEntityMaster';
import IComponentMaster from './IComponentMaster';
import ISystemMaster from './ISystemMaster';

export default interface IRenderingSystem extends ISystem {
  draw({}: {
    entities: IEntityMaster;
    components: IComponentMaster;
    systems: ISystemMaster;
    deltaTime: number;
    viewport: IViewport;
  }): void;
}
