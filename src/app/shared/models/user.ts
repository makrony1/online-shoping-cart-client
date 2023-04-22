export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

export interface CurrentUser {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  accessToken: string;
  roles: string[];
}

export interface VendorUser {
  id: number;
  name: string;
  address: string;
  phone: string;
}
