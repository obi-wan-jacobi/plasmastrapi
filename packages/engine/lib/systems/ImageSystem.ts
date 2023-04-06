import { IComponentMaster, IEntity } from '@plasmastrapi/ecs';
import RenderingSystem from '../abstracts/RenderingSystem';
import IViewport from '../interfaces/IViewport';
import ImageComponent from '../components/ImageComponent';
import { getAbsolutePose } from '@plasmastrapi/geometry';

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
