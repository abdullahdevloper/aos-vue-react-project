import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListSubGroup.module.scss';

interface ListSubGroupProps {
  group?: String
}

/**
 * ListSubGroup Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <ListSubGroup />
 */
export const ListSubGroup: React.FC<ListSubGroupProps> = ({
  group
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

ListSubGroup.displayName = 'ListSubGroup';

ListSubGroup.propTypes = {
  group: PropTypes.string
};

export default ListSubGroup;
