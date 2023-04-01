import { Dict } from '@plasmastrapi/base';

export default class HTML5ImageCache {
  private __data: Dict<HTMLImageElement> = new Map() as Dict<HTMLImageElement>;

  public load(src: string): CanvasImageSource {
    if (!this.__data.get(src)) {
      const image = new Image();
      image.src = src;
      this.__data.set(src, new Image());
    }
    return this.__data.get(src)!;
  }
}
