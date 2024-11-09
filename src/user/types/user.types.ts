export type User = {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
};

export type CreateUser = Pick<User, 'login' | 'password'>;

export type ReturnedUser = Omit<User, 'password'>;

export type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};
