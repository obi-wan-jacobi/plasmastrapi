import { IComponentMaster, IEntity } from '@plasmastrapi/ecs';
import { ImageComponent } from '@plasmastrapi/presentation';
import RenderingSystem from '../abstracts/RenderingSystem';
import IViewport from '../interfaces/IViewport';
import { getAbsolutePose } from '@plasmastrapi/helpers';

export default class ImageSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(ImageComponent)((image) => {
      const pose = getAbsolutePose(image.$entity as IEntity);
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
