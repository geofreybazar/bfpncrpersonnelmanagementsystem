export interface PictureInfo {
  url: string;
  fileName: string;
  name: string;
}
export interface User {
  id: string;
  rank: string;
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  email: string;
  district: string;
  city: string;
  office?: string;
  accountNumber: string;
  itAdmin: boolean;
  pictureInfo?: PictureInfo;
  token?: string;
  refreshToken?: string;
  assignment: string;
  officeOrStation: string;
}

export interface ReturnedGetAllPersonnel {
  personnel: User[];
  personnelLength: number;
}
export interface Credential {
  accountNumber: string;
  password: string;
}

export interface FireDistricts {
  name: string;
  id: string;
}

interface fireSubStations {
  fireSubStationName: string;
}
export interface CityMunicipalFireStations {
  name: string;
  fireDistrict: string;
  fireSubStations?: fireSubStations[];
}

interface FireTruck {
  engineType: string;
  brand: string;
  waterCapacity: string;
  yearAcquired: string;
  callsign: string;
  id: string;
}
interface Ambulances {
  brand: string;
  yearAcquired: string;
  callsign: string;
  id: string;
}

interface Location {
  lat: string;
  long: string;
}
interface CityFireStation {
  id: string;
  name: string;
}
export interface FireSubStations {
  fireDistrictId: FireDistricts;
  cityFireStationId: CityFireStation;
  name: string;
  id: string;
  fireTrucks: FireTruck[];
  ambulances: Ambulances[];
  location: Location;
}
export interface ReturnedFireDistricts {
  name: string;
  id: string;
  cities: string[];
}
export interface AddFireSubStion {
  fireDistrict: string;
  cityFireStation: string;
  name: string;
  long: string;
  lat: string;
}

export interface NewFireTruck {
  brand: string;
  callsign: string;
  engineType: string;
  fireSubStationId: string;
  waterCapacity: string;
  yearAcquired: string;
}

export interface NewAmbulance {
  brand: string;
  callsign: string;
  fireSubStationId: string;
  yearAcquired: string;
}

export interface UpdateFireSubStation {
  id: string;
  name: string;
  long: string;
  lat: string;
}

export interface PageAndRows {
  page: number;
  rowsPerPage: number;
}

export interface SearchFilter {
  rank: string;
  district: string;
  city: string;
  search: string;
  page: number;
  rowsPerPage: number;
}

export interface ReturnedGetFilteredPersonnel {
  searchedPersonnel: User[];
  searchedPersonnelLength: number;
}

export interface NewOffice {
  officeName: string;
  fireDistrict: string;
  cityFireStation: string;
}

export interface ReturnedOffice {
  fireDistrictId: {
    id: string;
    name: string;
  };
  cityFireStationId: {
    id: string;
    name: string;
  };
  officeName: string;
  personnel: string[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
