import { Connector } from "./connector";
import { Parent } from "./parent";
import { Position } from "./type";

export class HeadlessVPL {
  blocks: Parent[];
  constructor() {
    this.blocks = [];
  }

  //ブロックを追加
  public addBlock(block: Parent) {
    this.blocks.push(block);
  }

  //一番近いコネクターを取得
  public getNearestConnector({
    position,
    filter,
  }: {
    position: Position;
    filter?: { connectorId: string };
  }): Connector | null {
    let minDistance = Infinity;
    let nearestConnector: Connector | null = null;

    for (const block of this.blocks) {
      for (const connector of block.connectors) {
        const distance = Math.sqrt(
          (connector.position.x - position.x) ** 2 +
            (connector.position.y - position.y) ** 2
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestConnector = connector;
        }
      }
    }

    //filterが指定されている場合は、最も近いコネクターの中にそのコネクターがあるか確認し、あればそのコネクターを返す
    if (filter && nearestConnector) {
      const filterConnector = nearestConnector.id === filter.connectorId;
      if (filterConnector) {
        return nearestConnector;
      }
    }

    //コネクターと距離を返す
    return nearestConnector;
  }
}
