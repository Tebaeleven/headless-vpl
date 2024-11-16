import { Position } from '../type';

type Params = {
  w: number;
  h: number;
};

export class Rect {
  position: Position = { x: 0, y: 0 };
  w: number;
  h: number;

  constructor({ w, h }: Params) {
    this.w = w;
    this.h = h;
  }

  public getRect() {
    const origin = {
      x: this.position.x - this.w / 2,
      y: this.position.y - this.h / 2,
    };
    return {
      origin: origin,
      x: this.position.x,
      y: this.position.y,
      w: this.w,
      h: this.h,
    };
  }

  public moveTo(position: Position) {
    this.position = {
      x: position.x,
      y: position.y,
    };
  }
}
