import { IComponentMaster, System } from '@plasmastrapi/ecs';
import { IPose, PoseComponent } from '@plasmastrapi/geometry';
import VelocityComponent, { IVelocity } from '../components/VelocityComponent';

export default class VelocitySystem extends System {
  public once({ components, deltaTime }: { components: IComponentMaster; deltaTime: number }): void {
    components.forEvery(VelocityComponent)((velocityComponent) => {
      const velocity = velocityComponent.copy();
      const entity = velocityComponent.$entity;
      const pose = entity.$copy(PoseComponent);
      const { x, y, a } = getNextPose({ pose, velocity, dt: deltaTime });
      entity.$patch(PoseComponent, { x, y, a });
    });
  }
}

export function getNextPose({ pose, velocity, dt }: { pose: IPose; velocity: IVelocity; dt: number }): IPose {
  return {
    x: pose.x + velocity.x * dt,
    y: pose.y + velocity.y * dt,
    a: pose.a + velocity.w * dt,
  };
}
