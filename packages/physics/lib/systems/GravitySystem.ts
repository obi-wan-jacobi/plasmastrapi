import { IComponentMaster, System } from '@plasmastrapi/ecs';
import GravityComponent from '../components/GravityComponent';
import VelocityComponent from '../components/VelocityComponent';

export default class GravitySystem extends System {
  public once({ components, delta }: { components: IComponentMaster; delta: number }): void {
    components.forEvery(GravityComponent)((gravityComponent) => {
      const { x, y } = gravityComponent.copy();
      const dt = delta;
      const entity = gravityComponent.$entity;
      const v = entity.$copy(VelocityComponent);
      entity.$patch(VelocityComponent, {
        x: v.x + (x * dt) / 1000,
        y: v.y + (y * dt) / 1000,
        w: v.w,
      });
    });
  }
}
