export type Option = {
  label: string;
  value: string;
};

export interface OptionGroup<Option> {
  options: Option[];
  name: string;
  placeholder: string;
}
