// todo: rename
export interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserInfo {
  user: {
    statistics: {
      followers: string[];
      following: string[];
      posts: string[];
    };
    _id: string;
    username: string;
    email: string;
    avatar: string;
    savedPosts: string[];
    savedAIPosts: string[];
    __v: number;
    description: string;
  };
  activities: {
    [activityId: string]: {
      userInfo: {
        username: string;
      };
      filters: {
        topic: string;
        numOfKids: string;
        age: string;
        difficulty: string;
        place: string;
        duration: string;
      };
      materials: string[];
      _id: string;
      title: string;
      material: string;
      image: string;
      description: string;
      likes: string[];
      type: string;
      createdAt: string;
      __v: number;
    };
  }[];
}

export interface UserLogin {
  email: string;
  password: string;
}

// redux
export interface UserStatistics {
  followers: string[];
  following: string[];
  posts: string[];
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  description: string;
  savedPosts: string[];
  statistics: UserStatistics;
}
