import { FC, useState, memo } from 'react';

import {
  Note,
  Tags,
  ChangeEventType,
  NoteEventHandler,
} from '../../../../common/types';

import styles from './NoteEdit.module.scss';

interface NoteEditProps {
  note: Note;
  onEditNote: NoteEventHandler;
  setIsEditing: (isEditing: boolean) => void;
}

const NoteEdit: FC<NoteEditProps> = ({ note, onEditNote, setIsEditing }) => {
  const [text, setText] = useState<string>(note.text);
  const [tags, setTags] = useState<Tags>(note.tags);

  const handleSaveNote = () => {
    const tagRegex = /#\w+/g;
    const matches = text.match(tagRegex);
    const replacedText = text.replace(tagRegex, '').trim();

    const newTagsFromText: Tags = matches
      ? matches.map((match) => match.substring(1))
      : [];
    const updatedTags: Tags = tags.concat(newTagsFromText);
    const uniqueTags: Tags = Array.from(new Set(updatedTags));

    const updatedNote: Note = {
      ...note,
      text: replacedText,
      tags: uniqueTags,
    };

    onEditNote(updatedNote);
    setIsEditing(false);
  };

  const handleTextChange = (event: ChangeEventType) => {
    setText(event.target.value);
  };

  const handleTagsChange = (event: ChangeEventType) => {
    const newTags = event.target.value
      .split(',')
      .map((tag: string) => tag.trim());
    setTags(newTags);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <p className={styles.text}>Text:</p>
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <p className={styles.text}>Tags:</p>
          <input
            type="text"
            value={tags}
            onChange={handleTagsChange}
            placeholder="Tags, separated by commas"
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          onClick={handleSaveNote}
          className={styles.button}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default memo(NoteEdit);
