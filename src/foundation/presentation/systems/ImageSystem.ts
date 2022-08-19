import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import IViewport from 'engine/interfaces/IViewport';
import { getAbsolutePose } from 'foundation/helpers/entities';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import ImageComponent from '../components/ImageComponent';

export default class ImageSystem extends System {

  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
      components.forEvery(ImageComponent)((image) => {
          const pose = getAbsolutePose(image.$entity as IHTML5CanvasElement);
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