import { IComponentMaster, IEntity, ImageComponent } from '@plasmastrapi/ecs';
import RenderingSystem from '../abstracts/RenderingSystem';
import { IViewport } from '@plasmastrapi/viewport';
import { entityGetAbsolutePose } from '@plasmastrapi/helpers';

export default class ImageSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
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
