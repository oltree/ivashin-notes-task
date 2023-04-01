import { Tags, TagEventHandler } from '../../common/types';

import styles from './TagList.module.scss';

export const tagsMapper = (tags: Tags, onFilterNotesByTag: TagEventHandler) => {
  const handleTagClick = (tag: string) => {
    onFilterNotesByTag(tag);
  };

  return tags.map((tag: string) => (
    <button
      key={tag}
      onClick={() => handleTagClick(tag)}
      className={styles.button}
    >
      {tag}
    </button>
  ));
};
