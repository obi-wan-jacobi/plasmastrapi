import { Void } from '@plasmastrapi/base';
import { IImage, ILabel, IStyle, IViewport } from '@plasmastrapi/engine';
import { IPoint, IPose } from '@plasmastrapi/geometry';
import HTML5ImageCache from './cache/HTML5ImageCache';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Atomic({}, {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  descriptor.value = function (): void {
    this.__ctx.save();
    fn.apply(this, arguments);
    this.__ctx.restore();
  };
}

export default class HTML5CanvasViewport implements IViewport<CanvasImageSource> {
  public readonly width: number;
  public readonly height: number;

  private __ctx: CanvasRenderingContext2D;
  private __imageBuffer = new HTML5ImageCache();
  private __zBuffer: Array<{ method: Void<any>; payload: {}; zIndex: number }> = [];

  public constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.__ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
  }

  public load(src: string): CanvasImageSource {
    return this.__imageBuffer.load(src);
  }

  public render(): void {
    this.__ctx.clearRect(0, 0, this.width, this.height);
    const zOrdered = this.__zBuffer.sort((a, b) => a.zIndex - b.zIndex);
    zOrdered.forEach((target) => target.method.apply(this, [target.payload]));
    this.__zBuffer = [];
  }

  public drawImage(payload: { pose: IPose; image: IImage }): void {
    this.__zBuffer.push({
      method: this.__drawImage,
      payload,
      zIndex: payload.image.zIndex,
    });
  }

  public drawShape(payload: { path: IPoint[]; style: IStyle }): void {
    this.__zBuffer.push({
      method: this.__drawShape,
      payload,
      zIndex: payload.style.zIndex,
    });
  }

  public drawLine(payload: { path: IPoint[]; style: IStyle }): void {
    this.__zBuffer.push({
      method: this.__drawLine,
      payload,
      zIndex: payload.style.zIndex,
    });
  }

  public drawLabel(payload: { pose: IPose; style: IStyle; label: ILabel }): void {
    this.__zBuffer.push({
      method: this.__drawLabel,
      payload,
      zIndex: payload.style.zIndex,
    });
  }

  public drawCircle(payload: { position: IPoint; radius: number; style: IStyle }): void {
    this.__zBuffer.push({
      method: this.__drawCircle,
      payload,
      zIndex: payload.style.zIndex,
    });
  }

  @Atomic
  private __drawImage({ pose, image }: { pose: IPose; image: IImage }): void {
    const asset = this.load(image.src || './favicon.ico');
    const x = pose.x + (image.offset?.x || 0);
    const y = pose.y + (image.offset?.y || 0);
    this.__ctx.translate(x, y);
    this.__ctx.rotate(image.rotate || 0);
    this.__ctx.drawImage(
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
  private __drawShape({ path, style }: { path: IPoint[]; style: IStyle }): void {
    this.__ctx.globalAlpha = style.opacity;
    this.__ctx.strokeStyle = style.colour;
    this.__ctx.beginPath();
    path.forEach((p: IPoint) => {
      this.__ctx.lineTo(p.x, p.y);
    });
    this.__ctx.fillStyle = style.fill;
    this.__ctx.fill();
    this.__ctx.closePath();
    this.__ctx.stroke();
  }

  @Atomic
  private __drawLine({ path, style }: { path: IPoint[]; style: IStyle }): void {
    this.__ctx.strokeStyle = style.colour;
    this.__ctx.beginPath();
    path.forEach((p: IPoint) => {
      this.__ctx.lineTo(p.x, p.y);
    });
    this.__ctx.stroke();
  }

  @Atomic
  private __drawLabel({ pose, style, label }: { pose: IPose; style: IStyle; label: ILabel }): void {
    this.__ctx.fillStyle = style.colour;
    this.__ctx.font = `${label.fontSize}px Arial`;
    this.__ctx.fillText(label.text, pose.x + label.offset.x, pose.y + label.offset.y);
  }

  @Atomic
  private __drawCircle({ position, radius, style }: { position: IPoint; radius: number; style: IStyle }): void {
    this.__ctx.globalAlpha = style.opacity;
    this.__ctx.strokeStyle = style.colour;
    this.__ctx.fillStyle = style.fill;
    this.__ctx.beginPath();
    this.__ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    this.__ctx.fill();
    this.__ctx.closePath();
    this.__ctx.stroke();
  }
}
