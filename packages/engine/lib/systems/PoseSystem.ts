import { IComponentMaster, IEntity } from '@plasmastrapi/ecs';
import { PoseComponent } from '@plasmastrapi/geometry';
import { getAbsolutePose } from '@plasmastrapi/helpers';
import RenderingSystem from '../abstracts/RenderingSystem';
import { COLOUR } from '@plasmastrapi/presentation';
import IViewport from '../interfaces/IViewport';

export default class PoseSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(PoseComponent)((pose) => {
      const { x, y } = getAbsolutePose(pose.$entity as IEntity);
      viewport.drawCircle({
        position: { x, y },
        radius: 2,
        style: { fill: COLOUR.RGBA_0, opacity: 1, zIndex: 9999, colour: COLOUR.RGBA_GREEN },
      });
    });
  }
}
