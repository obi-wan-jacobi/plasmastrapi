import { IComponentMaster, ISystem } from '@plasmastrapi/ecs';
import IViewport from './IViewport';

export default interface IRenderingSystem extends ISystem {
  draw({}: { viewport: IViewport<any>; components: IComponentMaster }): void;
}
