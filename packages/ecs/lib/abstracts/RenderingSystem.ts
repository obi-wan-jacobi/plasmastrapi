import IEntityMaster from '../interfaces/IEntityMaster';
import System from './System';
import IComponentMaster from '../interfaces/IComponentMaster';
import ISystemMaster from '../interfaces/ISystemMaster';
import IRenderingSystem from '../interfaces/IRenderingSystem';
import { IViewport } from '@plasmastrapi/viewport';

export default abstract class RenderingSystem extends System implements IRenderingSystem {
  public once({}: {
    entities: IEntityMaster;
    components: IComponentMaster;
    systems: ISystemMaster;
    deltaTime: number;
    viewport: IViewport;
  }): void {}
  public abstract draw({}: {
    entities: IEntityMaster;
    components: IComponentMaster;
    systems: ISystemMaster;
    deltaTime: number;
    viewport: IViewport;
  }): void;
}
