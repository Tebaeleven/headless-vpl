// デバッグ用の接続線描画関数
export function drawConnectorCanvas(
  ctx: CanvasRenderingContext2D,
  source: { x: number; y: number },
  target: { x: number; y: number },
  maxDistance: number,
  color: string = 'red'
) {
  // 2点間の距離を計算
  const distance = Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2));

  // 距離が最大値を超える場合は描画しない
  if (distance > maxDistance) {
    return;
  }

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.moveTo(source.x, source.y);
  ctx.lineTo(target.x, target.y);
  ctx.stroke();
}

type DrawDebugRectParams = {
  ctx: CanvasRenderingContext2D;
  rect: { x: number; y: number; w: number; h: number };
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

// デバッグ用の矩形描画関数
export function drawRectCanvas({
  ctx,
  rect,
  color = 'blue',
  strokeColor = 'black',
  strokeWidth = 2,
}: DrawDebugRectParams) {
  ctx.fillStyle = color;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;

  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
}