import IEngine from './interfaces/IEngine';
import { COMPONENTS, ENTITIES, IComponentMaster, IEntityMaster, ISystem, ISystemMaster, Stor, SYSTEMS } from '@plasmastrapi/ecs';
import IRenderingSystem from './interfaces/IRenderingSystem';
import { IViewport } from '@plasmastrapi/viewport';

export default class Engine<TImageSource> implements IEngine<TImageSource> {
  public entities: IEntityMaster;
  public components: IComponentMaster;
  public systems: ISystemMaster;
  public viewport: IViewport<TImageSource>;

  private __t: Date;
  private __delta: number;

  constructor({ viewport, systems }: { viewport: IViewport<TImageSource>; systems: Stor[] }) {
    this.entities = ENTITIES;
    this.components = COMPONENTS;
    this.systems = SYSTEMS;
    this.viewport = viewport;
    this.__initSystems(systems);
  }

  private __initSystems(systems: Stor[]): void {
    systems.forEach((SystemCtor) => this.systems.add(SystemCtor));
  }

  public load(src: string, key?: string): TImageSource {
    return this.viewport.load(src, key);
  }

  public start(): void {
    setInterval(this.once.bind(this), 1000 / 100);
  }

  public once(): void {
    this.__doDelta();
    this.__doUpkeep();
    this.__doSystems();
    this.__doRender();
  }

  private __doDelta(): void {
    const now = new Date();
    this.__delta = now.getTime() - (this.__t || now).getTime();
    this.__t = now;
  }

  private __doUpkeep(): void {
    this.entities.upkeep();
    this.components.upkeep();
  }

  private __doSystems(): void {
    this.systems.forEach((system: ISystem) =>
      system.once({
        entities: this.entities,
        components: this.components,
        systems: this.systems,
        delta: this.__delta,
        viewport: this.viewport,
      }),
    );
  }

  private __doRender(): void {
    this.systems.forEach((system: ISystem) => {
      if ((system as any).draw instanceof Function) {
        (system as IRenderingSystem).draw({
          entities: this.entities,
          components: this.components,
          systems: this.systems,
          delta: this.__delta,
          viewport: this.viewport,
        });
      }
    });
    this.viewport.render();
  }
}
