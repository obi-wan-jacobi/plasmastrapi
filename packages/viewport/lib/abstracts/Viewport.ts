/* eslint-disable @typescript-eslint/no-unused-vars */
import { Void } from '@plasmastrapi/base';
import ICache from '../interfaces/ICache';
import IRenderingContext from '../interfaces/IRenderingContext';
import IViewport from '../interfaces/IViewport';
import { IImage } from '../interfaces/IImage';
import { IStyle } from '../interfaces/IStyle';
import { ILabel } from '../interfaces/ILabel';
import IRenderingPose from '../interfaces/IRenderingPose';
import IRenderingPoint from '../interfaces/IRenderingPoint';
import Atomic from '../decorators/Atomic';

export default abstract class Viewport<
  TImage extends {},
  TImageSource extends { width: number; height: number },
  TImageData extends { data: any },
> implements IViewport
{
  public readonly width: number;
  public readonly height: number;

  protected _ctx: IRenderingContext<TImageSource, TImageData>;
  protected _imageCache: ICache<TImage, TImageSource>;
  protected _pixelCache: ICache<TImageData, TImageData>;
  protected _zBuffer: Array<{ method: Void<any>; payload: {}; zIndex: number }> = [];

  public constructor({
    ctx,
    imageCache,
    pixelCache,
    width,
    height,
  }: {
    ctx: IRenderingContext<TImageSource, TImageData>;
    imageCache: ICache<TImage, TImageSource>;
    pixelCache: ICache<TImageData, TImageData>;
    width: number;
    height: number;
  }) {
    this._ctx = ctx;
    this._imageCache = imageCache;
    this._pixelCache = pixelCache;
    this.width = width;
    this.height = height;
  }

  public load<T, TSource>(key: string, image?: T & TImage): TSource & TImageSource {
    return this._imageCache.load(key, image) as any;
  }

  public render(): void {
    this._ctx.clearRect(0, 0, this.width, this.height);
    const zOrdered = this._zBuffer.sort((a, b) => a.zIndex - b.zIndex);
    zOrdered.forEach((target) => target.method.apply(this, [target.payload]));
    this._zBuffer = [];
  }

  @ZBuffered
  public drawImage(payload: { pose: IRenderingPose; image: IImage; style: IStyle }): void {}

  @ZBuffered
  public drawShape(payload: { path: IRenderingPoint[]; style: IStyle }): void {}

  @ZBuffered
  public drawLine(payload: { path: IRenderingPoint[]; style: IStyle }): void {}

  @ZBuffered
  public drawLabel(payload: { pose: IRenderingPose; label: ILabel; style: IStyle }): void {}

  @ZBuffered
  public drawCircle(payload: { position: IRenderingPoint; radius: number; style: IStyle }): void {}

  @ZBuffered
  public drawPixel(payload: { position: IRenderingPoint; style: IStyle }): void {}

  public drawPixelMap(payload: {
    cacheKey: string;
    position: IRenderingPoint;
    pixels: string[];
    scalingFactor: number;
    isDirty: boolean;
  }): void {
    this._zBuffer.push({
      method: this.__drawPixelMap,
      payload,
      zIndex: 9999,
    });
  }

  @Atomic
  private __drawImage({ pose, image }: { pose: IRenderingPose; image: IImage }): void {
    const asset = this.load(image.src);
    const x = pose.x + (image.offset?.x || 0);
    const y = pose.y + (image.offset?.y || 0);
    this._ctx.translate(x, y);
    this._ctx.rotate(image.rotate || 0);
    this._ctx.drawImage(
      /* image: */ asset,
      /* sx:    */ image.crop?.sourceX || 0,
      /* sy:    */ image.crop?.sourceY || 0,
      /* sw:    */ image.crop?.sourceWidth || image.width || (asset.width as number),
      /* sh:    */ image.crop?.sourceHeight || image.height || (asset.height as number),
      /* dx:    */ 0,
      /* dy:    */ 0,
      /* dw:    */ image.width || (asset.width as number),
      /* dh:    */ image.height || (asset.height as number),
    );
  }

  @Atomic
  private __drawShape({ path, style }: { path: IRenderingPoint[]; style: IStyle }): void {
    this._ctx.globalAlpha = style.opacity;
    this._ctx.strokeStyle = style.colour;
    this._ctx.beginPath();
    path.forEach((p: IRenderingPoint) => {
      this._ctx.lineTo(p.x, p.y);
    });
    this._ctx.fillStyle = style.fill;
    this._ctx.fill();
    this._ctx.closePath();
    this._ctx.stroke();
  }

  @Atomic
  private __drawLine({ path, style }: { path: IRenderingPoint[]; style: IStyle }): void {
    this._ctx.strokeStyle = style.colour;
    this._ctx.beginPath();
    path.forEach((p: IRenderingPoint) => {
      this._ctx.lineTo(p.x, p.y);
    });
    this._ctx.stroke();
  }

  @Atomic
  private __drawLabel({ pose, label, style }: { pose: IRenderingPose; style: IStyle; label: ILabel }): void {
    this._ctx.fillStyle = style.colour;
    this._ctx.font = `${label.fontSize}px Arial`;
    this._ctx.fillText(label.text, pose.x + label.offset.x, pose.y + label.offset.y);
  }

  @Atomic
  private __drawCircle({ position, radius, style }: { position: IRenderingPoint; radius: number; style: IStyle }): void {
    this._ctx.globalAlpha = style.opacity;
    this._ctx.strokeStyle = style.colour;
    this._ctx.fillStyle = style.fill;
    this._ctx.beginPath();
    this._ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    this._ctx.fill();
    this._ctx.closePath();
    this._ctx.stroke();
  }

  @Atomic
  private __drawPixel({ position, style }: { position: IRenderingPoint; style: IStyle }): void {
    const imageData = this._ctx.createImageData(1, 1);
    const data = imageData.data;
    let r = 255;
    let g = 255;
    let b = 255;
    let a = 255;
    const colours = style.colour.split(',');
    if (colours.length === 4) {
      [r, g, b, a] = colours.map((c: string) => Number.parseInt(c));
    }
    [data[0], data[1], data[2], data[3]] = [r, g, b, a];
    this._ctx.putImageData(imageData, position.x, position.y);
  }

  @Atomic
  private __drawPixelMap({
    cacheKey,
    position,
    pixels,
    scalingFactor,
    isDirty,
  }: {
    cacheKey: string;
    position: IRenderingPoint;
    pixels: string[];
    scalingFactor: number;
    isDirty: boolean;
  }): void {
    let imageData = this._pixelCache.load(cacheKey);
    const dimension = Math.sqrt(pixels.length);
    if (!imageData || isDirty) {
      imageData = this._ctx.getImageData(position.x, position.y, dimension, dimension);
      const data = imageData.data;
      for (let i = 0; i < pixels.length; ++i) {
        const [r, g, b, a] = pixels[i].split(',').map((c) => Number.parseInt(c));
        const x = i % dimension;
        const y = Math.floor(i / dimension) * dimension;
        const off = (y + x) * 4;
        data[off] = r;
        data[off + 1] = g;
        data[off + 2] = b;
        data[off + 3] = a;
      }
      this._pixelCache.load(cacheKey, imageData);
    }
    this._ctx.putImageData(imageData, position.x, position.y);
    if (scalingFactor === 1) {
      return;
    }
    this._ctx.scale(scalingFactor, scalingFactor);
    this._ctx.drawImage(
      /* image: */ this._ctx.canvas,
      /* sx:    */ position.x,
      /* sy:    */ position.y,
      /* sw:    */ dimension,
      /* sh:    */ dimension,
      /* dx:    */ position.x / scalingFactor,
      /* dy:    */ position.y / scalingFactor,
      /* dw:    */ dimension,
      /* dh:    */ dimension,
    );
  }
}

function ZBuffered({}, {}, descriptor: PropertyDescriptor): void {
  const fnName = descriptor.value.name;
  descriptor.value = function (): void {
    const payload = arguments[0];
    this._zBuffer.push({
      method: this[`__${fnName}`],
      payload,
      zIndex: payload.style.zIndex,
    });
  };
}
