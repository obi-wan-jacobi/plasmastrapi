import { IImage } from './IImage';
import { ILabel } from './ILabel';
import IRenderingPoint from './IRenderingPoint';
import IRenderingPose from './IRenderingPose';
import { IStyle } from './IStyle';

export default interface IViewport {
  width: number;
  height: number;
  load<TImage, TImageSource extends { width: number; height: number }>(key: string, image?: TImage): TImageSource;
  render(): void;
  drawImage({ pose, image, style }: { pose: IRenderingPose; image: IImage; style: IStyle }): void;
  drawLabel({ pose, label, style }: { pose: IRenderingPose; label: ILabel; style: IStyle }): void;
  drawShape({ path, style }: { path: IRenderingPoint[]; style: IStyle }): void;
  drawLine({ path, style }: { path: IRenderingPoint[]; style: IStyle }): void;
  drawCircle({ position, radius, style }: { position: IRenderingPoint; radius: number; style: IStyle }): void;
  drawPixel({ position, style }: { position: IRenderingPoint; style: IStyle }): void;
  drawPixelMap(payload: {
    cacheKey: string;
    position: IRenderingPoint;
    pixels: string[];
    scalingFactor: number;
    isDirty: boolean;
  }): void;
}
