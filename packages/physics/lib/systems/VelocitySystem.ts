import { IComponentMaster, PoseComponent, System } from '@plasmastrapi/ecs';
import VelocityComponent from '../components/VelocityComponent';

export default class VelocitySystem extends System {
  public once({ components, delta }: { components: IComponentMaster; delta: number }): void {
    components.forEvery(VelocityComponent)((velocity) => {
      const v = velocity.copy();
      const dt = delta;
      const entity = velocity.$entity;
      const pose = entity.$copy(PoseComponent)!;
      entity.$patch(PoseComponent, {
        x: pose.x + (v.x * dt) / 1000,
        y: pose.y + (v.y * dt) / 1000,
        a: pose.a + (v.w * dt) / 1000,
      });
    });
  }
}
