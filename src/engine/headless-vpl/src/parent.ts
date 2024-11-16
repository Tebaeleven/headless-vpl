import { Position } from "./type";
import { Connector } from "./connector";

type ParentProps = {
  id: string;
  position: Position;
  connectors?: Connector[];
};

export class Parent {
  id: string;
  position: Position;
  connectors: Connector[];
  constructor({ id, position, connectors }: ParentProps) {
    this.id = id;
    this.position = position;
    this.connectors = (connectors || []).map(connector => {
      connector.moveTo(position);
      return connector;
    });
  }

  public moveTo(position: Position) {
    this.position = position;
    this.connectors.forEach((connector) => {
      connector.moveTo(this.position);
    });
  }

  public addConnector(connector: Connector) {
    connector.moveTo(this.position);
    this.connectors.push(connector);
    console.log(this.connectors, "connectors");
  }
}
