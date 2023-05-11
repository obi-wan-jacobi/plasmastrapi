import { IComponentMaster, IEntity, PoseComponent } from '@plasmastrapi/ecs';
import RenderingSystem from '../abstracts/RenderingSystem';
import { IViewport } from '@plasmastrapi/viewport';
import { COLOUR } from '../enums/COLOUR';
import { entityGetAbsolutePose } from '@plasmastrapi/helpers';

export default class PoseSystem extends RenderingSystem {
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
