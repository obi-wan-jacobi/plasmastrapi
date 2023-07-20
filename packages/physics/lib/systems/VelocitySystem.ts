import { IComponentMaster, PoseComponent, System } from '@plasmastrapi/ecs';
import { IPose } from '@plasmastrapi/geometry';
import VelocityComponent, { IVelocity } from '../components/VelocityComponent';

export default class VelocitySystem extends System {
  public once({ components, delta }: { components: IComponentMaster; delta: number }): void {
    components.forEvery(VelocityComponent)((velocityComponent) => {
      const velocity = velocityComponent.copy();
      const entity = velocityComponent.$entity;
      const pose = entity.$copy(PoseComponent);
      const { x, y, a } = getNextPose({ pose, velocity, dt: delta });
      entity.$patch(PoseComponent, { x, y, a });
    });
  }
}

export function getNextPose({ pose, velocity, dt }: { pose: IPose; velocity: IVelocity; dt: number }): IPose {
  return {
    x: pose.x + (velocity.x * dt) / 1000,
    y: pose.y + (velocity.y * dt) / 1000,
    a: pose.a + (velocity.w * dt) / 1000,
  };
}
