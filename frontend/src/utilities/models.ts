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
  office: string;
  accountNumber: string;
  itAdmin: boolean;
  pictureInfo?: PictureInfo;
  token?: string;
  refreshToken?: string;
}

export interface Credential {
  accountNumber: string;
  password: string;
}

export interface FireDistricts {
  name: string;
  id: string;
}
