export interface ITurbine {
  turbine: string;
  warningAlarms?: IAlarms;
  criticalAlarms?: IAlarms;
}

export interface IAlarms {
  level: number;
  count: number;
}

export interface ITurbineResponse {
  turbine: string;
  level: number;
  count: number;
}

export enum AlarmType {
  WarningAlarms = 1,
  CriticalAlarms = 2,
}
