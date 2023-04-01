import { FC, useState, memo } from 'react';

import NoteView from './components/noteView/NoteView';
import NoteEdit from './components/noteEdit/NoteEdit';

import { NoteEventHandler, Note } from '../../common/types';

import styles from './NoteViewer.module.scss';

interface NoteViewerProps {
  note: Note;
  onEditNote: NoteEventHandler;
  onDeleteNote: NoteEventHandler;
}

const NoteViewer: FC<NoteViewerProps> = ({
  note,
  onEditNote,
  onDeleteNote,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const noteContent = isEditing ? (
    <NoteEdit
      note={note}
      onEditNote={onEditNote}
      setIsEditing={setIsEditing}
    />
  ) : (
    <NoteView
      note={note}
      onDeleteNote={onDeleteNote}
      setIsEditing={setIsEditing}
    />
  );

  return <div className={styles.wrapper}>{noteContent}</div>;
};

export default memo(NoteViewer);
