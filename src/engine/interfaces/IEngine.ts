import IComponentMaster from './IComponentMaster';
import IEntityMaster from './IEntityMaster';
import ISystemMaster from './ISystemMaster';

export default interface IEngine<TImageSource> {

  entities: IEntityMaster;
  components: IComponentMaster;
  systems: ISystemMaster;

  load(src: string): TImageSource;
  once(): void;
  start(): void;
}
