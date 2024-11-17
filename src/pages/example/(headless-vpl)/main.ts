import { AutoLayout } from '@/engine/headless-vpl/src/layout/auto_layout';
import { Connector } from '../../../engine/headless-vpl/src/connector';
import { HeadlessVPL } from '../../../engine/headless-vpl/src/manger';
import { Parent } from '../../../engine/headless-vpl/src/parent';
import { Rect } from '@/engine/headless-vpl/src/layout/rect';
import { drawDebugRect } from '@/engine/utils/debug/svg';
import { drawRectCanvas } from '@/engine/utils/debug/canvas';
import anime from 'animejs/lib/anime.es.js';

export const initialize = () => {
  const Manager = new HeadlessVPL();

  const block = new Parent({
    id: '1',
    position: { x: 100, y: 100 },
    connectors: [
      new Connector({
        offset: { x: 20, y: 60 },
        id: '1',
      }),
      new Connector({
        offset: { x: 20, y: 0 },
        id: '2',
      }),
      new Connector({
        offset: { x: 140, y: 70 },
        id: '3',
      }),
      new Connector({
        offset: { x: 160, y: 190 },
        id: '4',
      }),
    ],
  });

  Manager.addBlock(block);

  const autoLayout = new AutoLayout({ width: 300, height: 100, position: { x: 110, y: 100 } });
  autoLayout.addElement(new Rect({ w: Math.random() * 200, h: 50 }));
  autoLayout.addElement(new Rect({ w: Math.random() * 200, h: 50 }));
  autoLayout.addElement(new Rect({ w: 50, h: 50 }));

  autoLayout.setLayout();

  const workspace_debug = document.querySelector('#workspace2') as SVGSVGElement;
  drawDebugRect({
    rect: autoLayout.getRect(),
    parent: workspace_debug,
    color: 'gray',
    id: 'autoLayout',
  });

  const workspace_canvas = document.querySelector('#workspace_canvas') as HTMLCanvasElement;
  const ctx = workspace_canvas.getContext('2d') as CanvasRenderingContext2D;

  if (!ctx) {
    console.error('Canvasコンテキストが取得できません');
    return;
  }

  let frame = 0;
  function update() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //1000msごとにランダムに幅を変更
    if (frame % 100 === 0) {
      autoLayout.elements[0].w = Math.random() * 100 + 10;
      autoLayout.elements[1].w = Math.random() * 100 + 10;
    }

    autoLayout.setLayout();
    drawRectCanvas({ rect: autoLayout.getRect(), ctx: ctx, color: 'gray' });

    autoLayout.elements.forEach((rect, index) => {
      drawRectCanvas({ rect: rect.getRect(), ctx: ctx });
    });

    frame++;
    requestAnimationFrame(update);
  }

  update();
  // 初期化とイベントリスナーの設定
  const workspace = document.querySelector('#workspace2') as SVGSVGElement;
  if (workspace) {
    workspace.addEventListener('mousedown', startDrag);
    workspace.addEventListener('mousemove', move);
    workspace.addEventListener('mouseup', endDrag);
  } else {
    console.error('ワークスペースが見つかりません');
  }

  function startDrag(event: MouseEvent) {}

  function move(event: MouseEvent) {
    const workspace = document.querySelector('#workspace2') as SVGSVGElement;
    const rect = workspace.getBoundingClientRect();
    const position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const nearestConnector = Manager.getNearestConnector({ position });

    // 既存のパスを削除
    const existingPath = workspace.querySelector('.temp-connection-path');
    if (existingPath) {
      existingPath.remove();
    }

    // 最も近いコネクタが見つかった場合、パスを描画
    if (nearestConnector) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.classList.add('temp-connection-path');

      // マウス位置からコネクタまでの直線パスを作成
      const d = `M ${position.x} ${position.y} L ${nearestConnector.position.x} ${nearestConnector.position.y}`;

      path.setAttribute('d', d);
      path.setAttribute('stroke', 'red');
      path.setAttribute('stroke-width', '10');
      path.setAttribute('fill', 'none');

      workspace.appendChild(path);
    }
  }
  function endDrag(event: MouseEvent) {}
};

export default initialize;
