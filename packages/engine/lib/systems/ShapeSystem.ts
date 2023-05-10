import { IComponentMaster, PoseComponent, ShapeComponent, StyleComponent } from '@plasmastrapi/ecs';
import RenderingSystem from '../abstracts/RenderingSystem';
import { IViewport } from '@plasmastrapi/viewport';
import { getAbsolutePose } from '@plasmastrapi/helpers';
import { Shape } from '@plasmastrapi/geometry';

export default class ShapeSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(StyleComponent)((styleComponent) => {
      const entity = styleComponent.$entity;
      if (!entity.$has(ShapeComponent) || !entity.$has(PoseComponent)) {
        return;
      }
      const pose = getAbsolutePose(entity);
      const shape = entity.$copy(ShapeComponent);
      viewport.drawShape({
        path: Shape.transform(shape, pose).vertices,
        style: styleComponent.copy(),
      });
    });
  }
}
