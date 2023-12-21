import { RenderingSystem, IComponentMaster } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';
import { PoseComponent, Shape, ShapeComponent, entityGetAbsolutePose } from '@plasmastrapi/geometry';
import StyleComponent from '../components/StyleComponent';

export default class ShapeSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport; components: IComponentMaster }): void {
    components.forEvery(StyleComponent)((styleComponent: StyleComponent) => {
      const entity = styleComponent.$entity;
      if (!entity.$has(ShapeComponent) || !entity.$has(PoseComponent)) {
        return;
      }
      const pose = entityGetAbsolutePose(entity);
      const shape = entity.$copy(ShapeComponent);
      viewport.drawShape({
        path: Shape.transform(shape, pose).vertices,
        style: styleComponent.copy(),
      });
    });
  }
}
