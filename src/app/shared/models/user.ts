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
  vendorID: number;
  vendorname: string;
  address: string;
  phone: string;
}
