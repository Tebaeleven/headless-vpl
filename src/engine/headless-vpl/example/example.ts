import { Connector } from '../src/connector';
import { AutoLayout } from '../src/layout/auto_layout';
import { Rect } from '../src/layout/rect';
import { HeadlessVPL } from '../src/manger';
import { Parent } from '../src/parent';

const Manager = new HeadlessVPL();

// ブロックの作成
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
  ],
});

Manager.addBlock(block);
const nearestConnector = Manager.getNearestConnector({ position: { x: 100, y: 100 } });

console.log(nearestConnector);

// 自動レイアウト
const autoLayout = new AutoLayout(100, 100);
autoLayout.addElement(new Rect({ w: 100, h: 100 }));
autoLayout.addElement(new Rect({ w: 100, h: 100 }));
autoLayout.addElement(new Rect({ w: 100, h: 100 }));
