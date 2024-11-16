import { Position } from "./type";

export class Connector {
  offset: Position;
  id: string;
  position: Position;
  constructor({ offset, id }: { offset: Position; id: string }) {
    this.position = { x: 0, y: 0 };

    this.offset = offset;
    this.id = id;
  }

  public moveTo(position: Position) {
    this.position = {
      x: position.x + this.offset.x,
      y: position.y + this.offset.y,
    };
    console.log(this.position, "position");
  }
}
