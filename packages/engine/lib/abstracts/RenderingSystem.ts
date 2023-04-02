import { System, IComponentMaster, IEntityMaster, ISystemMaster } from '@plasmastrapi/ecs';
import IViewport from '../interfaces/IViewport';

export default abstract class RenderingSystem extends System {
  public once({}: {
    entities: IEntityMaster;
    components: IComponentMaster;
    systems: ISystemMaster;
    delta: number;
    viewport: { width: number; height: number };
  }): void {}
  public abstract draw({}: { viewport: IViewport<any>; components: IComponentMaster }): void;
}
