import { ChangeEvent } from 'react';

export type Tags = string[];
export interface Note {
  id: string;
  text: string;
  tags: Tags;
}
export type NoteEventHandler = (note: Note) => void;
export type TagEventHandler = (tag: string) => void;
export type ChangeEventType = ChangeEvent<HTMLInputElement>;
