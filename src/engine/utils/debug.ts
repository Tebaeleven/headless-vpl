// デバッグ用の接続線描画関数
export function drawDebugConnector(
  source: { x: number; y: number },
  target: { x: number; y: number },
  maxDistance: number,
  color: string = "red"
) {
  // 2点間の距離を計算
  const distance = Math.sqrt(
    Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2)
  );

  const workspace = document.querySelector("#workspace");
  const existingPath = document.querySelector("#connector-path");
  if (existingPath) {
    existingPath.remove();
  }

  // 距離が最大値を超える場合は描画しない
  if (distance > maxDistance) {
    return;
  }

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("id", "connector-path");
  path.setAttribute("d", `M ${source.x} ${source.y} L ${target.x} ${target.y}`);
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", "5");
  path.setAttribute("fill", "none");
  workspace?.appendChild(path);
}
