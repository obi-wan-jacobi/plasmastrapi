import { IComponentMaster, IEntity, RenderingSystem } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';
import { entityGetAbsolutePose } from '@plasmastrapi/geometry';
import ImageComponent from '../components/ImageComponent';
import StyleComponent from '../components/StyleComponent';

export default class ImageSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport; components: IComponentMaster }): void {
    components.forEvery(ImageComponent)((image) => {
      const pose = entityGetAbsolutePose(image.$entity as IEntity);
      const style = image.$entity.$copy(StyleComponent);
      viewport.drawImage({
        pose,
        image: image.copy(),
        style,
      });
    });
  }
}
