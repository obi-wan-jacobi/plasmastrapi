import { IComponentMaster, IEntity, RenderingSystem } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';
import { entityGetAbsolutePose } from '@plasmastrapi/geometry';
import ImageComponent from '../components/ImageComponent';

export default class ImageSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport; components: IComponentMaster }): void {
    components.forEvery(ImageComponent)((image) => {
      const pose = entityGetAbsolutePose(image.$entity as IEntity);
      if (!pose) {
        return;
      }
      viewport.drawImage({
        pose,
        image: image.copy(),
      });
    });
  }
}
