import { IComponentMaster, System } from '@plasmastrapi/ecs';
import GravityComponent from '../components/GravityComponent';
import VelocityComponent from '../components/VelocityComponent';

export default class GravitySystem extends System {
  public once({ components, deltaTime }: { components: IComponentMaster; deltaTime: number }): void {
    components.forEvery(GravityComponent)((gravityComponent) => {
      const { x, y } = gravityComponent.copy();
      const dt = deltaTime;
      const entity = gravityComponent.$entity;
      const v = entity.$copy(VelocityComponent);
      entity.$patch(VelocityComponent, {
        x: v.x + x * dt,
        y: v.y + y * dt,
        w: v.w,
      });
    });
  }
}
