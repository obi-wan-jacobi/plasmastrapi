import { Void } from '@plasmastrapi/base';
import { IImage, ILabel, IStyle, IViewport } from '@plasmastrapi/engine';
import { IPoint, IPose } from '@plasmastrapi/geometry';
import HTML5ImageCache from './memory/HTML5ImageCache';

function Atomic({}, {}, descriptor: PropertyDescriptor): void {
  const fn = descriptor.value;
  descriptor.value = function (): void {
    this.ctx.save();
    fn.apply(this, arguments);
    this.ctx.restore();
  };
}

export default class HTML5CanvasViewport implements IViewport<CanvasImageSource> {
  public ctx: CanvasRenderingContext2D;
  public width: number;
  public height: number;

  private __imageBuffer = new HTML5ImageCache();

  private __zBuffer: Array<{ method: Void<any>; payload: {}; zIndex: number }> = [];

  public constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
  }

  public load(src: string): CanvasImageSource {
    return this.__imageBuffer.load(src);
  }

  public render(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
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
    this.ctx.translate(pose.x, pose.y);
    this.ctx.rotate(image.rotate || 0);
    this.ctx.drawImage(
      asset,
      -(image.width || (asset.width as number)) / 2,
      -(image.height || (asset.height as number)) / 2,
      image.width || (asset.width as number),
      image.height || (asset.height as number),
    );
  }

  @Atomic
  private __drawShape({ path, style }: { path: IPoint[]; style: IStyle }): void {
    this.ctx.globalAlpha = style.opacity;
    this.ctx.strokeStyle = style.colour;
    this.ctx.beginPath();
    path.forEach((p: IPoint) => {
      this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.fillStyle = style.fill;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.stroke();
  }

  @Atomic
  private __drawLine({ path, style }: { path: IPoint[]; style: IStyle }): void {
    this.ctx.strokeStyle = style.colour;
    this.ctx.beginPath();
    path.forEach((p: IPoint) => {
      this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.stroke();
  }

  @Atomic
  private __drawLabel({ pose, style, label }: { pose: IPose; style: IStyle; label: ILabel }): void {
    this.ctx.fillStyle = style.colour;
    this.ctx.font = `${label.fontSize}px Arial`;
    this.ctx.fillText(label.text, pose.x + label.offset.x, pose.y + label.offset.y);
  }

  @Atomic
  private __drawCircle({ position, radius, style }: { position: IPoint; radius: number; style: IStyle }): void {
    this.ctx.globalAlpha = style.opacity;
    this.ctx.strokeStyle = style.colour;
    this.ctx.fillStyle = style.fill;
    this.ctx.beginPath();
    this.ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.stroke();
  }
}
