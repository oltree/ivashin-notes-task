import { Tags } from '../../../../common/types';

import styles from './NoteView.module.scss';

export const tagsMapper = (tags: Tags) =>
  tags.map((tag: string) => (
    <div
      key={tag}
      className={styles.tag}
    >
      {tag}
    </div>
  ));
