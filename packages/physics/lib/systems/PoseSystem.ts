import { RenderingSystem, IComponentMaster, IEntity } from '@plasmastrapi/ecs';
import { COLOUR, IViewport } from '@plasmastrapi/viewport';
import { PoseComponent, entityGetAbsolutePose } from '@plasmastrapi/geometry';

export default class PoseSystem extends RenderingSystem {
  public once({ components }: { viewport: IViewport; components: IComponentMaster }): void {
    components.forEvery(PoseComponent)((pose: PoseComponent) => {
      const entity = pose.$entity;
      const p = pose.copy();
      entity.$patch(PoseComponent, {
        $: {
          previous: { x: p.x, y: p.y, a: p.a },
        },
      });
    });
  }

  public draw({ viewport, components }: { viewport: IViewport; components: IComponentMaster }): void {
    components.forEvery(PoseComponent)((pose: PoseComponent) => {
      const { x, y } = entityGetAbsolutePose(pose.$entity as IEntity);
      viewport.drawCircle({
        position: { x, y },
        radius: 2,
        style: { fill: COLOUR.RGBA_0, opacity: 1, zIndex: 9999, colour: COLOUR.RGBA_GREEN },
      });
    });
  }
}
