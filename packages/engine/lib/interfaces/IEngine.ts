import { IComponentMaster, IEntityMaster, ISystemMaster } from '@plasmastrapi/ecs';

export default interface IEngine<TImageSource> {
  entities: IEntityMaster;
  components: IComponentMaster;
  systems: ISystemMaster;

  load(src: string): TImageSource;
  once(): void;
  start(): void;
}
