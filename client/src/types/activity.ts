export interface Option {
  label: string;
  value: string;
}

export interface OptionGroup<Option> {
  options: Option[];
  name: string;
  placeholder: string;
}

export interface FiltersWithValues {
  topic: string;
  numOfKids: string;
  age: string;
  difficulty: string;
  place: string;
  duration: string;
}
export interface FiltersWithOptions {
  topic: Option;
  numOfKids: Option;
  age: Option;
  difficulty: Option;
  place: Option;
  duration: Option;
}

export interface Activity {
  image?: string;
  filters: FiltersWithValues;
  title: string;
  materials: string[];
  description: string;
}

// publish
export interface FileInfo {
  secureUrl: string;
  publicId: string;
}

export interface PublishFormInput {
  topic: Option;
  numOfKids: Option;
  age: Option;
  difficulty: Option;
  place: Option;
  duration: Option;
  title: string;
  // materials?: string[];
  description: string;
}

export interface DraftPublish extends PublishFormInput {
  image: FileInfo;
  materials: string[];
}

export interface ActivityObject {
  activityInfo: {
    userInfo: {
      username: string;
    };
    filters: FiltersWithValues;
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
}
