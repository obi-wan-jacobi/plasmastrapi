import IComponentMaster from './IComponentMaster';
import IEntityMaster from './IEntityMaster';
import ISystemMaster from './ISystemMaster';

export default interface ISystem {
  once({}: { entities: IEntityMaster; components: IComponentMaster; systems: ISystemMaster; delta: number }): void;
}
