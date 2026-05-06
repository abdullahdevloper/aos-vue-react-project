import React from 'react';
import PropTypes from 'prop-types';
import styles from './ColumnarStatistic.module.scss';

interface ColumnarStatisticProps {
  items?: Array
}

/**
 * ColumnarStatistic Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <ColumnarStatistic />
 */
export const ColumnarStatistic: React.FC<ColumnarStatisticProps> = ({
  items
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

ColumnarStatistic.displayName = 'ColumnarStatistic';

ColumnarStatistic.propTypes = {
  items: PropTypes.array
};

export default ColumnarStatistic;
