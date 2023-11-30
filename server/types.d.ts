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

export interface UserStatistics {
  followers: any[];
  following: any[];
  posts: string[];
}
