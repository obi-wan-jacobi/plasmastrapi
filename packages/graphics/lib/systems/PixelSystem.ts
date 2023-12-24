import { IComponentMaster, RenderingSystem } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';
import PixelComponent from '../components/PixelComponent';
import StyleComponent from '../components/StyleComponent';

export default class PixelSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport; components: IComponentMaster }): void {
    components.forEvery(PixelComponent)((pixel) => {
      const style = pixel.$entity.$copy(StyleComponent);
      viewport.drawPixel({
        position: pixel.copy(),
        style,
      });
    });
  }
}
