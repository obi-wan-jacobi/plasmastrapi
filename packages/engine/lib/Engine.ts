import IEngine from './interfaces/IEngine';
import IViewport from './interfaces/IViewport';
import IPipe from './interfaces/IPipe';
import IPipeEvent from './interfaces/IPipeEvent';
import { Dict } from '@plasmastrapi/base';
import { COMPONENTS, ENTITIES, IComponentMaster, IEntityMaster, ISystem, ISystemMaster, Stor, SystemMaster } from '@plasmastrapi/ecs';
import IRenderingSystem from './interfaces/IRenderingSystem';

export default class Engine<TImageSource, TPipes extends Dict<IPipe<IPipeEvent>>> implements IEngine<TImageSource> {
  public entities: IEntityMaster;
  public components: IComponentMaster;
  public systems: ISystemMaster;
  public pipes: TPipes;
  public viewport: IViewport<TImageSource>;

  private __t: Date;
  private __delta: number;

  constructor({ viewport, pipes, systems }: { viewport: IViewport<TImageSource>; pipes: TPipes; systems: Stor[] }) {
    this.entities = ENTITIES;
    this.components = COMPONENTS;
    this.pipes = pipes;
    this.systems = new SystemMaster();
    this.viewport = viewport;
    this.__initSystems(systems);
  }

  private __initSystems(systems: Stor[]): void {
    systems.forEach((SystemCtor) => this.systems.add(SystemCtor));
  }

  public load(src: string): TImageSource {
    return this.viewport.load(src);
  }

  public start(): void {
    setInterval(this.once.bind(this), 1000 / 100);
  }

  public once(): void {
    this.__doDelta();
    this.__doPipes();
    this.__doUpkeep();
    this.__doSystems();
    this.__doRender();
  }

  private __doDelta(): void {
    const now = new Date();
    this.__delta = now.getTime() - (this.__t || now).getTime();
    this.__t = now;
  }

  private __doPipes(): void {
    Object.keys(this.pipes).forEach((key) => this.pipes[key].next());
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
      }),
    );
  }

  private __doRender(): void {
    this.systems.forEach((system: ISystem) => {
      if ((system as any).draw instanceof Function) {
        (system as IRenderingSystem).draw({
          viewport: this.viewport,
          components: this.components,
        });
      }
    });
    this.viewport.render();
  }
}
