import { Option, OptionGroup } from '../../types/activity';

const topicOptions: Option[] = [
  { value: 'Nature', label: 'Nature' },
  { value: 'Art', label: 'Art' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Constructions', label: 'Constructions' },
  { value: 'Logic', label: 'Logic' },
  { value: 'Linguistic', label: 'Linguistic' },
];

const kidsOptions: Option[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: 'more than 3', label: 'more than 3' },
];

const ageRangeOptions: Option[] = [
  { value: '0 - 3', label: '0 - 3' },
  { value: '3 - 5', label: '3 - 5' },
  { value: '5 - 7', label: '5 - 7' },
  { value: '7 - 9', label: '7 - 9' },
  { value: '9 - 12', label: '9 - 12' },
  { value: '12 - 14', label: '12 - 14' },
];

const difficultyOptions: Option[] = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Expert', label: 'Expert' },
];

const placeOptions: Option[] = [
  { value: 'Outside', label: 'Outside' },
  { value: 'Inside', label: 'Inside' },
];

const durationOptions: Option[] = [
  { value: '< 1h', label: '< 1h' },
  { value: '1h < 2h', label: '1h < 2h' },
  { value: '2h < 3h', label: '2h < 3h' },
  { value: '3h <', label: '3h <' },
];

const topicGroup: OptionGroup<Option> = {
  name: 'topic',
  placeholder: 'Topic',
  options: topicOptions,
};

const kidsGroup: OptionGroup<Option> = {
  name: 'numOfKids',
  placeholder: 'Number of kids',
  options: kidsOptions,
};

const ageGroup: OptionGroup<Option> = {
  name: 'age',
  placeholder: 'Age range',
  options: ageRangeOptions,
};

const difficultyGroup: OptionGroup<Option> = {
  name: 'difficulty',
  placeholder: 'Difficulty',
  options: difficultyOptions,
};

const placeGroup: OptionGroup<Option> = {
  name: 'place',
  placeholder: 'Place',
  options: placeOptions,
};

const durationGroup: OptionGroup<Option> = {
  name: 'duration',
  placeholder: 'Duration',
  options: durationOptions,
};

export const filterGroups: OptionGroup<Option>[] = [
  topicGroup,
  kidsGroup,
  ageGroup,
  difficultyGroup,
  placeGroup,
  durationGroup,
];
