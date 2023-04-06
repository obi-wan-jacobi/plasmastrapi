import { IComponentMaster } from '@plasmastrapi/ecs';
import { LineComponent } from '@plasmastrapi/geometry';
import RenderingSystem from '../abstracts/RenderingSystem';
import IViewport from '../interfaces/IViewport';
import StyleComponent from '../components/StyleComponent';

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
