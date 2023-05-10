import { IPose, IPoint } from '@plasmastrapi/geometry';
import { IImage } from './IImage';
import { ILabel } from './ILabel';
import { IStyle } from './IStyle';

export default interface IViewport<TImageSource> {
  width: number;
  height: number;
  load(src: string, key?: string): TImageSource;
  render(): void;
  drawImage({ pose, image }: { pose: IPose; image: IImage }): void;
  drawLabel({ pose, style, label }: { pose: IPose; style: IStyle; label: ILabel }): void;
  drawShape({ path, style }: { path: IPoint[]; style: IStyle }): void;
  drawLine({ path, style }: { path: IPoint[]; style: IStyle }): void;
  drawCircle({ position, radius, style }: { position: IPoint; radius: number; style: IStyle }): void;
}
