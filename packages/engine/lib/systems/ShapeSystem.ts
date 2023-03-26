import { IComponentMaster, IEntity } from '@plasmastrapi/ecs';
import { ShapeComponent, transformShape } from '@plasmastrapi/geometry';
import { getAbsolutePose } from '@plasmastrapi/helpers';
import { StyleComponent } from '@plasmastrapi/presentation';
import RenderingSystem from '../abstracts/RenderingSystem';
import IViewport from '../interfaces/IViewport';

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
