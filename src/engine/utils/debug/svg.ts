// デバッグ用の接続線描画関数
export function drawDebugConnector(
  source: { x: number; y: number },
  target: { x: number; y: number },
  maxDistance: number,
  color: string = 'red'
) {
  // 2点間の距離を計算
  const distance = Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2));

  const workspace = document.querySelector('#workspace');
  const existingPath = document.querySelector('#connector-path');
  if (existingPath) {
    existingPath.remove();
  }

  // 距離が最大値を超える場合は描画しない
  if (distance > maxDistance) {
    return;
  }

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('id', 'connector-path');
  path.setAttribute('d', `M ${source.x} ${source.y} L ${target.x} ${target.y}`);
  path.setAttribute('stroke', color);
  path.setAttribute('stroke-width', '5');
  path.setAttribute('fill', 'none');
  workspace?.appendChild(path);
}

type DrawDebugRectParams = {
  rect: { x: number; y: number; w: number; h: number };
  parent: SVGElement | null;
  color?: string;
  strokeColor?: string;
  strokeWidth?: string;
  id: string;
};

// デバッグ用の矩形描画関数
export function drawDebugRect({
  rect,
  parent,
  color = 'blue',
  strokeColor = 'black',
  strokeWidth = '2',
  id,
}: DrawDebugRectParams) {
  if (!parent) {
    console.error('親要素が指定されていません');
    return;
  }

  const svgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  svgRect.setAttribute('id', id);
  svgRect.setAttribute('x', rect.x.toString());
  svgRect.setAttribute('y', rect.y.toString());
  svgRect.setAttribute('width', rect.w.toString());
  svgRect.setAttribute('height', rect.h.toString());
  svgRect.setAttribute('fill', color);
  svgRect.setAttribute('stroke', strokeColor);
  svgRect.setAttribute('stroke-width', strokeWidth);

  parent.appendChild(svgRect);
}
