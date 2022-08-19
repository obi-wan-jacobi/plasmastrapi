import { IPoint, IPose } from 'foundation/geometry/components/PoseComponent';
import { IImage } from 'foundation/presentation/components/ImageComponent';
import { ILabel } from 'foundation/presentation/components/LabelComponent';
import { IStyle } from 'foundation/presentation/components/StyleComponent';

export default interface IViewport<TImageSource> {

    load(src: string): TImageSource;

    render(): void;

    drawImage({ pose, image }: { pose: IPose; image: IImage }): void;

    drawLabel({ pose, style, label }: { pose: IPose; style: IStyle; label: ILabel }): void;

    drawShape({ path, style }: { path: IPoint[]; style: IStyle }): void;

    drawLine({ path, style }: { path: IPoint[]; style: IStyle }): void;

    drawCircle({ position, radius, style }: { position: IPoint; radius: number; style: IStyle }): void;
}
