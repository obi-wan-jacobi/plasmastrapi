import System from 'engine/abstracts/System';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import IViewport from 'engine/interfaces/IViewport';
import { getAbsolutePose } from 'foundation/helpers/entities';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';
import LabelComponent from '../components/LabelComponent';
import StyleComponent from '../components/StyleComponent';

export default class LabelSystem extends System {

  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
      components.forEvery(LabelComponent)((label) => {
          const style = label.$entity.$copy(StyleComponent);
          const pose = getAbsolutePose(label.$entity as IHTML5CanvasElement);
          if (!style || !pose) {
              return;
          }
          viewport.drawLabel({
              pose,
              style,
              label: label.copy(),
          });
      });
  }
}