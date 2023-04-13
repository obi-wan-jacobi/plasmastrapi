import { IComponentMaster, LineComponent, StyleComponent } from '@plasmastrapi/ecs';
import RenderingSystem from '../abstracts/RenderingSystem';
import { IViewport } from '@plasmastrapi/viewport';

export default class LineSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(LineComponent)((line) => {
      const style = line.$entity.$copy(StyleComponent);
      if (!style) {
        return;
      }
      viewport.drawLine({
        path: line.copy().path,
        style,
      });
    });
  }
}
