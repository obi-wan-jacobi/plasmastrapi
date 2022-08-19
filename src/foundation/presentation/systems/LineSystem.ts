import StyleComponent from '../components/StyleComponent';
import System from '../../../engine/abstracts/System';
import IViewport from 'engine/interfaces/IViewport';
import IComponentMaster from 'engine/interfaces/IComponentMaster';
import LineComponent from 'foundation/geometry/components/LineComponent';

export default class LineSystem extends System {

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