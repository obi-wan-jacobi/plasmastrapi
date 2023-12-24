import { IComponentMaster, IEntity, RenderingSystem } from '@plasmastrapi/ecs';
import { IViewport } from '@plasmastrapi/viewport';
import { entityGetAbsolutePose } from '@plasmastrapi/geometry';
import LabelComponent from '../components/LabelComponent';
import StyleComponent from '../components/StyleComponent';

export default class LabelSystem extends RenderingSystem {
  public draw({ viewport, components }: { viewport: IViewport; components: IComponentMaster }): void {
    components.forEvery(LabelComponent)((label) => {
      const pose = entityGetAbsolutePose(label.$entity as IEntity);
      const style = label.$entity.$copy(StyleComponent);
      viewport.drawLabel({
        pose,
        style,
        label: label.copy(),
      });
    });
  }
}
