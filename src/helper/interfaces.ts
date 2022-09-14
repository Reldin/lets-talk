export interface ICategory {
  id: number;
  name: string;
}

export interface ITopic {
  id: number;
  categoryId: number;
  title: string;
  appUserId: number;
}

export interface IReduxStates {
  category: [];
  auth: {
    isAuthenticated: boolean;
    username: string;
  };
}

export interface INewCategory {
  name: string;
}

export interface INewTopic {
  categoryId: number | string;
  title: string;
}

export interface PostInterface {
  id: number;
  message: string;
  appUserId: number;
  topicId: number;
  appUser: {
    id: number;
    username: string;
  };
}
