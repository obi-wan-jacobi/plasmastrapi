import { IComponentMaster, System } from '@plasmastrapi/ecs';
import AccelerationComponent from '../components/AccelerationComponent';
import VelocityComponent from '../components/VelocityComponent';

export default class AccelerationSystem extends System {
  public once({ components, deltaTime }: { components: IComponentMaster; deltaTime: number }): void {
    components.forEvery(AccelerationComponent)((acceleration) => {
      const a = acceleration.copy();
      const dt = deltaTime;
      const entity = acceleration.$entity;
      const v = entity.$copy(VelocityComponent);
      entity.$mutate(VelocityComponent, {
        x: v.x + a.x * dt,
        y: v.y + a.y * dt,
        w: v.w + a.w * dt,
      });
    });
  }
}
