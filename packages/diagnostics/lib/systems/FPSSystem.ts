import { IComponentMaster } from '@plasmastrapi/ecs';
import { RenderingSystem, IViewport } from '@plasmastrapi/engine';
import { ShapeComponent } from '@plasmastrapi/geometry';
import { COLOUR } from '@plasmastrapi/presentation';

export default class FPSSystem extends RenderingSystem {
  private __printValue = '';
  private __nodeCount = 0;
  private __printCounter = 0;
  private __delta = 0;

  public once({ delta }: { delta: number }): void {
    this.__delta = delta;
  }

  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    let nodes = 0;
    this.__printCounter++;
    if (this.__printCounter === 30) {
      components.forEvery(ShapeComponent)((component) => {
        const shape = component.copy();
        nodes += shape.vertices.length;
      });
      this.__printCounter = 0;
      this.__printValue = `${Math.round(1000 / this.__delta)}`;
      this.__nodeCount = nodes;
    }
    viewport.drawLabel({
      pose: { x: 0, y: viewport.height, a: 0 },
      style: { colour: COLOUR.RGBA_WHITE, fill: COLOUR.RGBA_0, opacity: 1, zIndex: 0 },
      label: {
        fontSize: 20,
        text: `${this.__printValue} : ${this.__nodeCount}`,
        offset: { x: 0, y: 0 },
      },
    });
  }
}
