import { Dict } from '@plasmastrapi/base';

export default class HTML5ImageCache {
  private __data: Dict<HTMLImageElement> = new Map() as Dict<HTMLImageElement>;

  public load(src: string, key?: string): CanvasImageSource {
    key = key || src;
    if (!this.__data.get(key)) {
      const image = new Image();
      image.src = src;
      this.__data.set(key, image);
    }
    return this.__data.get(key)!;
  }
}
