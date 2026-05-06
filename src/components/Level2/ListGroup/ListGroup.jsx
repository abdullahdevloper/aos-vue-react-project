import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListGroup.module.scss';

interface ListGroupProps {
  group?: String
}

/**
 * ListGroup Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <ListGroup />
 */
export const ListGroup: React.FC<ListGroupProps> = ({
  group
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

ListGroup.displayName = 'ListGroup';

ListGroup.propTypes = {
  group: PropTypes.string
};

export default ListGroup;
