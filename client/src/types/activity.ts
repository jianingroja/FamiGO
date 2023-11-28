export type Option = {
  label: string;
  value: string;
};

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

export interface Activity {
  image?: string;
  filters: FiltersWithValues;
  title: string;
  materials: string[];
  description: string;
}
