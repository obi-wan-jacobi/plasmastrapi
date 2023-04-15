import { IComponentMaster, System } from '@plasmastrapi/ecs';
import AccelerationComponent from '../components/AccelerationComponent';
import VelocityComponent from '../components/VelocityComponent';

export default class AccelerationSystem extends System {
  public once({ components, delta }: { components: IComponentMaster; delta: number }): void {
    components.forEvery(AccelerationComponent)((acceleration) => {
      const a = acceleration.copy();
      const dt = delta;
      const entity = acceleration.$entity;
      const v = entity.$copy(VelocityComponent)!;
      entity.$mutate(VelocityComponent, {
        x: v.x + (a.x * dt) / 1000,
        y: v.y + (a.y * dt) / 1000,
        w: v.w + (a.w * dt) / 1000,
        $: {
          previous: {
            x: v.x,
            y: v.y,
            w: v.w,
          },
        },
      });
    });
  }
}
