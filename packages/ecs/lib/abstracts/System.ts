import IComponentMaster from '../interfaces/IComponentMaster';
import IEntityMaster from '../interfaces/IEntityMaster';
import ISystem from '../interfaces/ISystem';
import ISystemMaster from '../interfaces/ISystemMaster';

export default abstract class System implements ISystem {
  public abstract once({}: { entities: IEntityMaster; components: IComponentMaster; systems: ISystemMaster; delta: number }): void;
}
