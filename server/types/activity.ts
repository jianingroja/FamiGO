export interface FiltersWithValues {
  topic: string;
  numOfKids: string;
  age: string;
  difficulty: string;
  place: string;
  duration: string;
}

export interface ActivityWithUser {
  image?: string;
  filters: FiltersWithValues;
  title: string;
  materials: string[];
  description: string;
  userInfo: {
    username: string;
  };
}
