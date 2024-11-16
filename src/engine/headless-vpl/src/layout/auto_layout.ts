import { Rect, Position } from './rect';

type Params = {
  width: number;
  height: number;
  position: Position;
};

export class AutoLayout {
  elements: Rect[];
  position: Position;
  width: number;
  height: number;

  constructor({ width, height, position }: Params) {
    this.elements = [];
    this.position = position;
    this.width = width;
    this.height = height;
  }

  public addElement(element: Rect) {
    this.elements.push(element);
  }

  // 要素を並べる
  public setLayout() {
    //上下を揃える
    this.elements.forEach((element) => {
      element.position.y = this.height / 2 - element.h / 2 + this.position.y;
    });

    // 要素間の余白
    const padding = 20;

    // 全要素の幅と余白の合計を計算
    const totalWidth =
      this.elements.reduce((sum, element) => sum + element.w, 0) +
      padding * (this.elements.length - 1);
    console.log(totalWidth);

    // 左端の開始位置を計算（中央揃え）
    // let currentX = this.width / 2 - totalWidth / 2;

    // 左端の開始位置を計算（左揃え）
    let currentX = 20;

    // 要素を左から右に順に配置
    this.elements.forEach((element) => {
      element.position.x = currentX + this.position.x;
      currentX += element.w + padding;
    });
  }

  public getRect() {
    return {
      x: this.position.x,
      y: this.position.y,
      w: this.width,
      h: this.height,
    };
  }
}
