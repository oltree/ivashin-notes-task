import { useState, FC, FormEvent, ChangeEvent, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { NoteEventHandler } from '../../common/types';

import styles from './NoteEditor.module.scss';

interface NoteEditorProps {
  onAddNote: NoteEventHandler;
}

const NoteEditor: FC<NoteEditorProps> = ({ onAddNote }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text.length >= 3) {
      const tagRegex = /#\w+/g;
      const matches = text.match(tagRegex);
      const tags = matches ? matches.map((match) => match.substring(1)) : [];
      const replacedText = text.replace(tagRegex, '').trim();

      onAddNote({
        id: uuidv4(),
        text: replacedText,
        tags,
      });

      setText('');
      setError(null);
    } else {
      setError('Note must contain at least 3 characters!');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <input
        value={text}
        type="text"
        placeholder="Note..."
        onChange={handleChange}
        className={styles.input}
      />
      {error && <p className={styles.error}>{error}</p>}
      <button
        type="submit"
        className={styles.button}
      >
        Add Note
      </button>
    </form>
  );
};

export default memo(NoteEditor);
