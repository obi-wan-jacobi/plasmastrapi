import { IComponentMaster, IEntity, PoseComponent } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';
import { entityGetAbsolutePose } from '@plasmastrapi/helpers';
import RenderingSystem from '../abstracts/RenderingSystem';
import { COLOUR } from '../enums/COLOUR';

export default class PoseSystem extends RenderingSystem {
  public once({ components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(PoseComponent)((pose) => {
      const entity = pose.$entity;
      const p = pose.copy();
      entity.$patch(PoseComponent, {
        $: {
          previous: { x: p.x, y: p.y, a: p.a },
        },
      });
    });
  }

  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(PoseComponent)((pose) => {
      const { x, y } = entityGetAbsolutePose(pose.$entity as IEntity);
      viewport.drawCircle({
        position: { x, y },
        radius: 2,
        style: { fill: COLOUR.RGBA_0, opacity: 1, zIndex: 9999, colour: COLOUR.RGBA_GREEN },
      });
    });
  }
}
