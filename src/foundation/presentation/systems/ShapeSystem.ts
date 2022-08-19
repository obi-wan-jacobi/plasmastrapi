import StyleComponent from '../components/StyleComponent';
import System from '../../../engine/abstracts/System';
import ShapeComponent from 'foundation/geometry/components/ShapeComponent';
import { transformShape } from '../../helpers/geometry';
import IViewport from 'engine/interfaces/IViewport';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import { getAbsolutePose } from 'foundation/helpers/entities';
import IHTML5CanvasElement from 'html5-canvas/interfaces/IHTML5CanvasElement';

export default class ShapeSystem extends System {

    public draw({ viewport, components }: { viewport: IViewport<any>; components: IComponentMaster }): void {
        components.forEvery(ShapeComponent)((shape) => {
            const pose = getAbsolutePose(shape.$entity as IHTML5CanvasElement);
            const style = shape.$entity.$copy(StyleComponent);
            if (!pose || !style) {
                return;
            }
            viewport.drawShape({
                path: transformShape(shape.copy(), pose).vertices,
                style,
            });
        });
    }
}
