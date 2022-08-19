import IComponentMaster from './interfaces/IComponentMaster';
import IEngine from './interfaces/IEngine';
import IEntityMaster from './interfaces/IEntityMaster';
import ISystem from './interfaces/ISystem';
import IViewport from './interfaces/IViewport';
import { Stor } from './types';
import { ENTITIES } from './concretes/EntityMaster';
import { COMPONENTS } from './concretes/ComponentMaster';
import IPipe from './interfaces/IPipe';
import IPipeEvent from './interfaces/IPipeEvent';
import { Dict } from 'base/types';
import ISystemMaster from './interfaces/ISystemMaster';
import SystemMaster from './concretes/SystemMaster';

export default class Engine<TImageSource, TPipes extends Dict<IPipe<IPipeEvent>>> implements IEngine<TImageSource> {

  public entities: IEntityMaster;
  public components: IComponentMaster;
  public systems: ISystemMaster;
  public pipes: TPipes;

  private __viewport: IViewport<TImageSource>;
  private __t: Date;
  private __delta: number;

  constructor({ viewport, pipes, systems }: { viewport: IViewport<TImageSource>; pipes: TPipes; systems: Stor[] }) {
    this.entities = ENTITIES;
    this.components = COMPONENTS;
    this.pipes = pipes;
    this.systems = new SystemMaster();
    this.__viewport = viewport;
    this.__initSystems(systems);
  }

  private __initSystems(systems: Stor[]): void {
    systems.forEach((SystemCtor) => this.systems.add(SystemCtor));
  }

  public load(src: string): TImageSource {
    return this.__viewport.load(src);
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

  private __doSystems(): void {
    this.systems.forEach((system: ISystem) => system.once({
        entities: this.entities,
        components: this.components,
        systems: this.systems,
        pipes: this.pipes,
        delta: this.__delta,
      })
    );
  }

  private __doUpkeep(): void {
    this.entities.upkeep();
    this.components.upkeep();
  }

  private __doRender(): void {
    this.systems.forEach((system: ISystem) => system.draw({
        viewport: this.__viewport,
        components: this.components,
      })
    );
    this.__viewport.render();
  }
}
