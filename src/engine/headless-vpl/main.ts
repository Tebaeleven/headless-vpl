import { Connector } from "./src/connector";
import { HeadlessVPL } from "./src/manger";
import { Parent } from "./src/parent";

export const initialize = () => {
  const Manager = new HeadlessVPL();

  const block = new Parent({
    id: "1",
    position: { x: 100, y: 100 },
    connectors: [
      new Connector({
        offset: { x: 20, y: 60 },
        id: "1",
      }),
      new Connector({
        offset: { x: 20, y: 0 },
        id: "2",
      }),
      new Connector({
        offset: { x: 140, y: 70 },
        id: "3",
      }),
      new Connector({
        offset: { x: 160, y: 190 },
        id: "4",
      }),
    ],
  });

  Manager.addBlock(block);

  // 初期化とイベントリスナーの設定
  const workspace = document.querySelector("#workspace2") as SVGSVGElement;
  if (workspace) {
    workspace.addEventListener("mousedown", startDrag);
    workspace.addEventListener("mousemove", move);
    workspace.addEventListener("mouseup", endDrag);
  } else {
    console.error("ワークスペースが見つかりません");
  }

  function startDrag(event: MouseEvent) {}

  function move(event: MouseEvent) {
    const workspace = document.querySelector("#workspace2") as SVGSVGElement;
    const rect = workspace.getBoundingClientRect();
    const position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const nearestConnector = Manager.getNearestConnector({ position });

    // 既存のパスを削除
    const existingPath = workspace.querySelector(".temp-connection-path");
    if (existingPath) {
      existingPath.remove();
    }

    // 最も近いコネクタが見つかった場合、パスを描画
    if (nearestConnector) {
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.classList.add("temp-connection-path");

      // マウス位置からコネクタまでの直線パスを作成
      const d = `M ${position.x} ${position.y} L ${nearestConnector.position.x} ${nearestConnector.position.y}`;

      path.setAttribute("d", d);
      path.setAttribute("stroke", "red");
      path.setAttribute("stroke-width", "10");
      path.setAttribute("fill", "none");

      workspace.appendChild(path);
    }
  }

  function endDrag(event: MouseEvent) {}
};

export default initialize;
