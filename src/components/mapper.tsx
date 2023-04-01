import NoteViewer from './noteViewer/NoteViewer';

import { Note, NoteEventHandler } from '../common/types';

export const notesMapper = (
  notes: Note[],
  handleEditNote: NoteEventHandler,
  handleDeleteNote: NoteEventHandler
) =>
  notes.map((note) => (
    <NoteViewer
      key={note.id}
      note={note}
      onEditNote={handleEditNote}
      onDeleteNote={handleDeleteNote}
    />
  ));
