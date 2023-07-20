import { IComponentMaster, StyleComponent, PixelComponent } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';
import RenderingSystem from '../abstracts/RenderingSystem';

export default class PixelSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(PixelComponent)((pixel) => {
      const style = pixel.$entity.$copy(StyleComponent);
      if (!style) {
        return;
      }
      viewport.drawPixel({
        position: pixel.copy(),
        style,
      });
    });
  }
}
