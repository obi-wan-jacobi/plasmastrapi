import { RenderingSystem, IComponentMaster } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';
import LineComponent from '../components/LineComponent';
import StyleComponent from '../components/StyleComponent';

export default class LineSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport; components: IComponentMaster }): void {
    components.forEvery(LineComponent)((line: LineComponent) => {
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
