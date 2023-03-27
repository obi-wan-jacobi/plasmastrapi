import { Dict } from '@plasmastrapi/base';

export default class HTML5ImageCache {
  private __data: Dict<HTMLImageElement> = {};

  public load(src: string): CanvasImageSource {
    if (!this.__data[src]) {
      this.__data[src] = new Image();
      this.__data[src].src = src;
    }
    return this.__data[src];
  }
}
