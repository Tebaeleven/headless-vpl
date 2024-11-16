import { Connector } from "../src/connector";
import { HeadlessVPL } from "../src/manger";
import { Parent } from "../src/parent";   

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
  ],
});

Manager.addBlock(block);
const nearestConnector = Manager.getNearestConnector({ position: { x: 100, y: 100 } });

console.log(nearestConnector);