export interface AjonpUser {
  aboutYou?: string;
  created?: number;
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  favoriteColor?: string;
  lastActive?: number;
  phoneNumber?: string;
  photoURL?: string;
  roles?: AjonpRoles;
  token?: string;
  uid: string;
  untappd?: {
    access_token?: string;
  };
  website?: string;
}
export interface AjonpRoles {
  admin?: boolean;
  editor?: boolean;
  subscriber?: boolean;
}
