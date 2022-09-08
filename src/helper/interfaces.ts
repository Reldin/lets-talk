export interface ICategory {
  id: number;
  name: string;
}

export interface IReduxStates {
  category: [];
  auth: {
    isAuthenticated: boolean;
    username: string;
  };
}
