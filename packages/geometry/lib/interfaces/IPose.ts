import { IPoint } from './IPoint';

export interface IPose extends IPoint {
  a: number;
  $?: {
    previous: IPoint & {
      a: number;
    };
  };
}
