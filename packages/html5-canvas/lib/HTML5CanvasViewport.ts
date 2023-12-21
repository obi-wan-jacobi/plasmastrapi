import HTML5ImageCache from './cache/HTML5ImageCache';
import { IViewport, Viewport } from '@plasmastrapi/viewport';
import HTML5PixelCache from './cache/HTML5PixelCache';

export default class HTML5CanvasViewport extends Viewport<HTMLImageElement, HTMLCanvasElement, ImageData> implements IViewport {
  public constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    super({
      ctx: canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D,
      imageCache: new HTML5ImageCache(),
      pixelCache: new HTML5PixelCache(),
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    });
  }

  public load<T, TSource>(src: string): TSource & HTMLCanvasElement {
    const image = super.load(src);
    if (image) {
      return image as TSource & HTMLCanvasElement;
    }
    const newImage = new Image();
    newImage.src = src;
    return super.load(src, newImage) as TSource & HTMLCanvasElement;
  }
}
