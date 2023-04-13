import { IComponentMaster, IEntity, ShapeComponent, StyleComponent } from '@plasmastrapi/ecs';
import { transformShape } from '@plasmastrapi/geometry';
import RenderingSystem from '../abstracts/RenderingSystem';
import { IViewport } from '@plasmastrapi/viewport';
import { getAbsolutePose } from '@plasmastrapi/helpers';

export default class ShapeSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(ShapeComponent)((shape) => {
      const pose = getAbsolutePose(shape.$entity as IEntity);
      const style = shape.$entity.$copy(StyleComponent);
      if (!pose || !style) {
        return;
      }
      viewport.drawShape({
        path: transformShape(shape.copy(), pose).vertices,
        style,
      });
    });
  }
}
