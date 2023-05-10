import { IComponentMaster, IEntityMaster, ISystemMaster } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';

export default interface IEngine<TImageSource> {
  entities: IEntityMaster;
  components: IComponentMaster;
  systems: ISystemMaster;
  viewport: IViewport<TImageSource>;

  load(src: string, key?: string): TImageSource;
  once(): void;
  start(): void;
}
