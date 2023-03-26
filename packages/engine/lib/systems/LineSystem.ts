import { IComponentMaster } from '@plasmastrapi/ecs';
import { LineComponent } from '@plasmastrapi/geometry';
import { StyleComponent } from '@plasmastrapi/presentation';
import RenderingSystem from '../abstracts/RenderingSystem';
import IViewport from '../interfaces/IViewport';

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
