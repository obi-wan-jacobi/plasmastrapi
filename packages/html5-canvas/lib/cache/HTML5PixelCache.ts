import { Dict } from '@plasmastrapi/base';

export default class PixelCache {
  private __data: Dict<ImageData> = new Map() as Dict<ImageData>;

  public set(key: string, data: ImageData): void {
    this.__data.set(key, data);
  }

  public get(key: string): ImageData | undefined {
    return this.__data.get(key);
  }
}
