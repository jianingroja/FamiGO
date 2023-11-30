export interface UserStatistics {
  followers: any[];
  following: any[];
  posts: string[];
}

export interface UsersData {
  [key: string]: {
    statistics: UserStatistics;
    _id: string;
    username: string;
    email: string;
    avatar: string;
    savedPosts: any[];
    __v: number;
  };
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  savedPosts: any[];
  statistics: UserStatistics;
}
