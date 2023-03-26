import { System, IComponentMaster } from '@plasmastrapi/ecs';
import IViewport from '../interfaces/IViewport';

export default abstract class RenderingSystem extends System {
  public once(): void {}

  public abstract draw({}: { viewport: IViewport<any>; components: IComponentMaster }): void;
}
