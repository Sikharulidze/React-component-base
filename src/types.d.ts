export type ComponentPropsType = {
  name: string;
  require: boolean;
  description: string;
};

export type SvgComponentType = {
  name: string;
  description: string;
  image: string;
  base: string;
  props: ComponentPropsType[];
  "js-snippet": string;
  "ts-snippet": string;
  id: string;
  collectionName?: string;
};

export type FeedbackType = {
  text: string;
  email?: string;
};
