import { FiltersWithValues } from './activity';

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
  randomActivities?: FeedActivity[];
}
