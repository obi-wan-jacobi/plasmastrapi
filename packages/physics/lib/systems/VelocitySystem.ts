import { IComponentMaster, System } from '@plasmastrapi/ecs';
import VelocityComponent from '../components/VelocityComponent';
import { PoseComponent } from '@plasmastrapi/geometry';

export default class VelocitySystem extends System {
  public once({ components, delta }: { components: IComponentMaster; delta: number }): void {
    components.forEvery(VelocityComponent)((velocity) => {
      const v = velocity.copy();
      const pose = velocity.$entity.$copy(PoseComponent)!;
      const dt = delta;
      velocity.$entity.$patch(PoseComponent, {
        x: pose.x + v.x * dt,
        y: pose.y + v.y * dt,
        a: pose.a + v.w * dt,
      });
    });
  }
}
