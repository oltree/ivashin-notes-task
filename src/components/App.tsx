import { FC, useState, useEffect, useCallback } from 'react';

import NoteEditor from './noteEditor/NoteEditor';
import TagList from './tagList/TagList';

import { Note, Tags } from '../common/types';
import { API_SERVER } from '../common/constants';
import { notesMapper } from './mapper';

import styles from './App.module.scss';

const App: FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tags>([]);

  useEffect(() => {
    fetch(API_SERVER)
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((e) => {
        console.error(e);
        console.error(
          'Clone this repository, use npm start and use npm run server'
        );
      });
  }, []);

  useEffect(() => {
    const allTags = notes.flatMap((note) => note.tags);
    const uniqueTags = new Set(allTags);
    setTags(Array.from(uniqueTags));
  }, [notes]);

  const handleAddNote = useCallback(
    async (note: Note) => {
      try {
        const response = await fetch(API_SERVER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note),
        });
        const data = await response.json();
        setNotes([data, ...notes]);
      } catch (e) {
        console.error(e);
      }
    },
    [notes]
  );

  const handleEditNote = useCallback(
    async (note: Note) => {
      try {
        const response = await fetch(`${API_SERVER}/${note.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(note),
        });
        const data = await response.json();
        const updatedNotes = notes.map((selectedNote) =>
          selectedNote.id === note.id ? data : selectedNote
        );
        setNotes(updatedNotes);
      } catch (e) {
        console.error(e);
      }
    },
    [notes]
  );

  const handleDeleteNote = useCallback(
    async (note: Note) => {
      try {
        const updatedNotes = notes.filter(
          (selectedNote) => selectedNote.id !== note.id
        );
        setNotes(updatedNotes);

        await fetch(`${API_SERVER}/${note.id}`, {
          method: 'DELETE',
        });
      } catch (e) {
        console.error(e);
      }
    },
    [notes]
  );

  const handlefilterNotesByTag = useCallback(async (tag: string) => {
    const url = tag ? `${API_SERVER}?tags_like=${tag}` : `${API_SERVER}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setNotes(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <NoteEditor onAddNote={handleAddNote} />
        <div className={styles.notes}>
          {notesMapper(notes, handleEditNote, handleDeleteNote)}
        </div>
        <TagList
          tags={tags}
          onFilterNotesByTag={handlefilterNotesByTag}
        />
      </div>
    </div>
  );
};

export default App;
