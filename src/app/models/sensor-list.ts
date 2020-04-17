import { SensorDescription } from './sensor-description';

export class SensorList {
  [group: string]: {
    list: SensorDescription[],
    show?: boolean
  };
}
