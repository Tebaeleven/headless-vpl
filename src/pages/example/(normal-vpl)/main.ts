import { drawDebugConnector } from '@/engine/utils/debug/svg';

export function initialize() {
  const CONNECTOR_DISTANCE = 100;

  // ブロックの状態を管理するインターフェース
  interface BlockState {
    id: string;
    position: { x: number; y: number };
    parent: { id: string | null };
    child: { id: string | null };
  }

  // ドラッグ中のブロック要素と座標のオフセットを保持する変数
  let selectedBlockState: BlockState | null = null;
  let offset = { x: 0, y: 0 };
  //一番近い接続先を管理 id,distance,
  let nearestConnection: { id: string | null; distance: number } = {
    id: null,
    distance: Infinity,
  };
  // ブロックの状態を管理するMap
  const blockStates = new Map<string, BlockState>();

  // 初期状態の設定
  function initializeBlockStates() {
    const blocks = document.querySelectorAll('.block') as NodeListOf<SVGElement>;
    blocks.forEach((block, key) => {
      let position = { x: 0, y: 0 };

      blockStates.set(block.id, {
        id: block.id,
        position: position,
        parent: { id: null },
        child: { id: null },
      });

      updateBlockPosition(block.id, position);
    });
  }

  // ブロックの位置を更新する関数
  function updateBlockPosition(blockId: string, position: { x: number; y: number }) {
    const state = blockStates.get(blockId);
    if (state) {
      // 現在の位置と新しい位置の差分を計算
      const deltaX = position.x - state.position.x;
      const deltaY = position.y - state.position.y;

      // 現在のブロックの位置を更新
      state.position = position;
      const element = document.querySelector(`#${blockId}`) as SVGElement;
      if (element) {
        element.setAttribute('transform', `translate(${position.x},${position.y})`);
      }

      if (blockId === 'block2') {
        //svgのtext要素を取得
        const textElement = element.querySelector('text') as SVGTextElement;
        if (textElement) {
          textElement.textContent = `${position.x},${position.y}`;
        }
        const distance = connectorDistance(blockId, 'block1');
        textElement.textContent = `${distance}`;
        if (distance) {
          nearestConnection = { id: 'block1', distance: distance };
        }
      }

      console.log(nearestConnection);

      // 子ブロックが存在する場合、再帰的に位置を更新
      if (state.child.id) {
        const childState = blockStates.get(state.child.id);
        if (childState) {
          updateBlockPosition(childState.id, {
            x: childState.position.x + deltaX,
            y: childState.position.y + deltaY,
          });
        }
      }
    }
  }

  // ドラッグ開始時の処理
  function startDrag(evt: MouseEvent) {
    const target = evt.target as Element;

    // input要素やforeignObject要素の場合は、ドラッグを開始しない
    if (target.tagName === 'INPUT' || target.tagName === 'foreignObject') {
      return;
    }

    const blockElement = target.closest('.block') as SVGElement;
    if (blockElement) {
      const blockId = blockElement.id;
      const state = blockStates.get(blockId);
      if (state) {
        selectedBlockState = state;
        // クリック位置を保存
        offset = {
          x: evt.clientX,
          y: evt.clientY,
        };
      }
    }
  }

  // ドラッグ中の処理
  function drag(evt: MouseEvent) {
    if (selectedBlockState) {
      evt.preventDefault();

      // クリック時の位置からの移動量を計算
      const newPosition = {
        x: selectedBlockState.position.x + (evt.clientX - offset.x),
        y: selectedBlockState.position.y + (evt.clientY - offset.y),
      };

      // オフセットを更新
      offset.x = evt.clientX;
      offset.y = evt.clientY;

      updateBlockPosition(selectedBlockState.id, newPosition);
    }
  }

  // ドラッグ終了時の処理
  function endDrag() {
    if (
      selectedBlockState &&
      selectedBlockState.id === 'block2' &&
      nearestConnection.distance <= CONNECTOR_DISTANCE
    ) {
      //接続設定
      connectBlock('block2', nearestConnection.id!);
    } else {
      //接続解除
      console.log('接続解除しました');
      disconnectBlock('block2');
    }
    selectedBlockState = null;
  }

  function connectBlock(childID: string, parentID: string) {
    const childState = blockStates.get(childID);
    const parentState = blockStates.get(parentID);

    if (childState && parentState) {
      // 既存の接続を解除
      if (childState.parent.id) {
        const oldParent = blockStates.get(childState.parent.id);
        if (oldParent) {
          oldParent.child.id = null;
        }
      }

      // 新しい接続を設定
      childState.parent.id = parentID;
      parentState.child.id = childID;

      childState.position = {
        x: parentState.position.x,
        y: parentState.position.y + 60,
      };
      updateBlockPosition(childID, childState.position);
    }
  }

  function disconnectBlock(childID: string) {
    const childState = blockStates.get(childID);
    if (childState && childState.parent.id) {
      const parentState = blockStates.get(childState.parent.id);
      if (parentState) {
        parentState.child.id = null;
      }
      childState.parent.id = null;
    }
  }

  function connectorDistance(source: string, target: string) {
    const sourceBlock = blockStates.get(source);
    const targetBlock = blockStates.get(target);
    if (sourceBlock && targetBlock) {
      const sourceConnectorPosition = {
        x: sourceBlock.position.x + 20,
        y: sourceBlock.position.y + 0,
      };

      const targetConnectorPosition = {
        x: targetBlock.position.x + 20,
        y: targetBlock.position.y + 60,
      };

      // デバッグ用の接続線描画
      drawDebugConnector(sourceConnectorPosition, targetConnectorPosition, 100);

      return Math.sqrt(
        Math.pow(sourceConnectorPosition.x - targetConnectorPosition.x, 2) +
          Math.pow(sourceConnectorPosition.y - targetConnectorPosition.y, 2)
      );
    }
  }

  // 初期化とイベントリスナーの設定
  const workspace = document.querySelector('#workspace') as SVGSVGElement;
  if (workspace) {
    initializeBlockStates();
    workspace.addEventListener('mousedown', startDrag);
    workspace.addEventListener('mousemove', drag);
    workspace.addEventListener('mouseup', endDrag);
  } else {
    console.error('ワークスペースが見つかりません');
  }
}

export default initialize;
