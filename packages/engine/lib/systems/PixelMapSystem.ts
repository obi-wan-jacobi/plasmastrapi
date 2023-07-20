import { IComponentMaster, PixelMapComponent } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';
import RenderingSystem from '../abstracts/RenderingSystem';

export default class PixelMapSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(PixelMapComponent)((pixelMap) => {
      const { position, pixels, scalingFactor, isDirty } = pixelMap.copy();
      pixelMap.patch({ isDirty: false });
      viewport.drawPixelMap({
        cacheKey: pixelMap.$entity.$id,
        position,
        pixels,
        scalingFactor,
        isDirty,
      });
    });
  }
}
