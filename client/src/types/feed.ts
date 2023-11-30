import { Option, FiltersWithValues } from './activity';

export interface FeedActivity {
  _id: string;
  userInfo: {
    username: string;
  };
  title: string;
  materials: string[];
  image: string;
  description: string;
  filters: FiltersWithValues;
  likes: string[];
  type: string;
  createdAt: string;
}

export interface FeedResponseData {
  activities: FeedActivity[];
}

export interface FiltersWithOptions {
  topic: Option | undefined;
  numOfKids: Option | undefined;
  age: Option | undefined;
  difficulty: Option | undefined;
  place: Option | undefined;
  duration: Option | undefined;
}
