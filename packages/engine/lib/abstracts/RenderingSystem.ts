import { System, IComponentMaster, IEntityMaster, ISystemMaster } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';

export default abstract class RenderingSystem extends System {
  public once({}: {
    entities: IEntityMaster;
    components: IComponentMaster;
    systems: ISystemMaster;
    deltaTime: number;
    viewport: IViewport<any>;
  }): void {}
  public abstract draw({}: {
    entities: IEntityMaster;
    components: IComponentMaster;
    systems: ISystemMaster;
    deltaTime: number;
    viewport: IViewport<any>;
  }): void;
}
