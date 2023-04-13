import { IComponentMaster, IEntity, LabelComponent, StyleComponent } from '@plasmastrapi/ecs';
import RenderingSystem from '../abstracts/RenderingSystem';
import { getAbsolutePose } from '@plasmastrapi/helpers';
import { IViewport } from '@plasmastrapi/viewport';

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
