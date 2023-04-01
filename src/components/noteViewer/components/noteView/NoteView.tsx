import { FC, memo } from 'react';

import { tagsMapper } from './mapper';
import { Note, NoteEventHandler } from '../../../../common/types';

import styles from './NoteView.module.scss';

interface NoteViewProps {
  note: Note;
  onDeleteNote: NoteEventHandler;
  setIsEditing: (isEditing: boolean) => void;
}

const NoteView: FC<NoteViewProps> = ({ note, onDeleteNote, setIsEditing }) => {
  const handleDeleteNote = () => {
    onDeleteNote(note);
  };
  const handleStartEditing = () => {
    setIsEditing(true);
  };
  const isTags = note.tags.length > 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.note}>
        <p className={styles.text}>{note.text}</p>
        <div className={styles.tags}>
          {isTags && <p>Tags:</p>}
          {tagsMapper(note.tags)}
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={handleStartEditing}
        >
          Edit
        </button>
        <button
          className={styles.button}
          onClick={handleDeleteNote}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default memo(NoteView);
