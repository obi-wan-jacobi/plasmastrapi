import ISystem from '../interfaces/ISystem';
import IViewport from 'engine/interfaces/IViewport';
import IEntityMaster from 'engine/interfaces/IEntityMaster';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import ISystemMaster from 'engine/interfaces/ISystemMaster';

export default abstract class System implements ISystem {

  public once<TPipes>({}: { entities: IEntityMaster; components: IComponentMaster; systems: ISystemMaster; pipes: TPipes; delta: number }): void { return; }

  public draw({}: { viewport: IViewport<any>; components: IComponentMaster }): void { return; }

}
