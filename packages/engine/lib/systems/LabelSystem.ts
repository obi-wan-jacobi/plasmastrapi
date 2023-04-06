import { IComponentMaster, IEntity } from '@plasmastrapi/ecs';
import RenderingSystem from '../abstracts/RenderingSystem';
import IViewport from '../interfaces/IViewport';
import LabelComponent from '../components/LabelComponent';
import StyleComponent from '../components/StyleComponent';
import { getAbsolutePose } from '@plasmastrapi/geometry';

export default class LabelSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
    components.forEvery(LabelComponent)((label) => {
      const style = label.$entity.$copy(StyleComponent);
      const pose = getAbsolutePose(label.$entity as IEntity);
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
