import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListItem.module.scss';

interface ListItemProps {
  title?: String
}

/**
 * ListItem Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <ListItem />
 */
export const ListItem: React.FC<ListItemProps> = ({
  title
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  title: PropTypes.string
};

export default ListItem;
