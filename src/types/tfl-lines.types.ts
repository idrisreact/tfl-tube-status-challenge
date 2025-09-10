

export interface ValidityPeriod {
  $type: string;
  fromDate: string;
  toDate: string;
  isNow: boolean;
}

export interface Disruption {
  $type: string;
  category: string;
  categoryDescription: string;
  description: string;
  affectedRoutes: any[];
  affectedStops: any[];
  closureText: string;
}

export interface LineStatus {
  $type: string;
  id: number;
  lineId: string;
  statusSeverity: number;
  statusSeverityDescription: string;
  reason: string;
  created: string;
  validityPeriods: ValidityPeriod[];
  disruption: Disruption;
}

export interface ServiceType {
  $type: string;
  name: string;
  uri: string;
}

export interface Crowding {
  $type: string;
}

export interface TflLineResponse {
  $type: string;
  id: string;
  name: string;
  modeName: string;
  disruptions: any[];
  created: string;
  modified: string;
  lineStatuses: LineStatus[];
  routeSections: any[];
  serviceTypes: ServiceType[];
  crowding: Crowding;
}