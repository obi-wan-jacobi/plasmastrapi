import { IComponentMaster, System } from '@plasmastrapi/ecs';
import ImpulseComponent from '../components/ImpulseComponent';
import PhysicalComponent from '../components/PhysicalComponent';
import VelocityComponent from '../components/VelocityComponent';

export default class ImpulseSystem extends System {
  public once({ components }: { components: IComponentMaster }): void {
    components.forEvery(ImpulseComponent)((impulseComponent) => {
      const entity = impulseComponent.$entity;
      const { mass } = entity.$copy(PhysicalComponent);
      const { x: ix, y: iy } = impulseComponent.copy();
      const i = { x: ix / mass, y: iy / mass };
      const v = entity.$copy(VelocityComponent);
      // dp = F*dt --> v = p/m
      entity.$patch(VelocityComponent, {
        x: v.x + i.x,
        y: v.y + i.y,
      });
      // shed impulse after new velocity resolution
      entity.$remove(ImpulseComponent);
    });
  }
}
