import { IComponentMaster, IEntityMaster, ISystem, ISystemMaster } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';

export default interface IRenderingSystem extends ISystem {
  draw({}: {
    entities: IEntityMaster;
    components: IComponentMaster;
    systems: ISystemMaster;
    deltaTime: number;
    viewport: IViewport<any>;
  }): void;
}
