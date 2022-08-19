import VelocityComponent from '../components/VelocityComponent';
import System from 'engine/abstracts/System';
import PoseComponent from 'foundation/geometry/components/PoseComponent';
import IComponentMaster from 'engine/interfaces/IComponentMaster';

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
