import { FC, memo } from 'react';

import { tagsMapper } from './mapper';
import { Tags, TagEventHandler } from '../../common/types';

import styles from './TagList.module.scss';

interface TagListProps {
  tags: Tags;
  onFilterNotesByTag: TagEventHandler;
}

const TagList: FC<TagListProps> = ({ tags, onFilterNotesByTag }) => {
  const isDisabled = tags.length === 0;

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        disabled={isDisabled}
        onClick={() => onFilterNotesByTag('')}
      >
        All tags
      </button>
      {tagsMapper(tags, onFilterNotesByTag)}
    </div>
  );
};

export default memo(TagList);
