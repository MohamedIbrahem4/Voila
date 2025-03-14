

export type StorageLanguage = 'ar' | 'en';
export enum StorageKey {
  Language = 'LANGUAGE',
  Tokenization = 'TOKENIZATION',
  AccountLogo = 'ACCOUNTLOGO',
  Permissions = 'PERMISSIONS',
  AccountId = 'AccountId',
  User = 'USER',
  UserLogin = 'USER_LOGIN',
}


export enum ServerEndPoint {
  EMPTY = '',
  InitUser = 'identities/init',
  Permission = 'Identities/permissions',
  Refresh = 'Identities/refreshtoken',

}
export enum Permissions {
  SuperAdmin = 'SuperAdmin',
  AddOrder = 'AddOrder',
  Dashboard = 'Dashboard',
  GetProducts = 'GetProductes',
  GetCustomers = 'GetCustomers',
  GetWarehouses = 'GetWarehouses',
  GetShipments = 'GetShipments',
  GetBoxTypes = 'GetBoxTypes',
  GetAccounts = 'GetAccounts',
  GetCarriers = 'GetCarriers',
  GetOrders = 'GetOrders',
  GetLocations = 'GetLocations',
  Settings = 'Settings',
}
