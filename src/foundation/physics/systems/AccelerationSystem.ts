import AccelerationComponent from '../components/AccelerationComponent';
import System from '../../../engine/abstracts/System';
import VelocityComponent from '../components/VelocityComponent';
import IComponentMaster from 'engine/interfaces/IComponentMaster';

export default class AccelerationSystem extends System {

  public once({ components, delta }: { components: IComponentMaster; delta: number }): void {
    components.forEvery(AccelerationComponent)((acceleration) => {
      const a = acceleration.copy();
      const v = acceleration.$entity.$copy(VelocityComponent)!;
      const dt = delta;
      acceleration.$entity.$patch(VelocityComponent, {
        x: v.x + a.x * dt,
        y: v.y + a.y * dt,
        w: v.w + a.w * dt,
      });
    });
  }
}
