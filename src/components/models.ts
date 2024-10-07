//import { EnumType } from 'typescript';

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export enum CommentTypeEnum {
  Positive,
  Neutral,
  Negative,
}
export interface Comment {
  _id?: number;
  type: CommentTypeEnum;
  content: string;
  keywords?: Array<string> | null | undefined;
  abstract?: string | null | undefined;
}
