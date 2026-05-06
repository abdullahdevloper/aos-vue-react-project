import React from 'react';
import PropTypes from 'prop-types';
import styles from './TwoLinesItems.module.scss';

interface TwoLinesItemsProps {
  icon?: String
}

/**
 * TwoLinesItems Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <TwoLinesItems />
 */
export const TwoLinesItems: React.FC<TwoLinesItemsProps> = ({
  icon
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

TwoLinesItems.displayName = 'TwoLinesItems';

TwoLinesItems.propTypes = {
  icon: PropTypes.string
};

export default TwoLinesItems;
