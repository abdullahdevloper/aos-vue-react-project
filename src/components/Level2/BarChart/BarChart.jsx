import React from 'react';
import PropTypes from 'prop-types';
import styles from './BarChart.module.scss';

interface BarChartProps {
  linearStroke?: Array
}

/**
 * BarChart Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <BarChart />
 */
export const BarChart: React.FC<BarChartProps> = ({
  linearStroke
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

BarChart.displayName = 'BarChart';

BarChart.propTypes = {
  linearStroke: PropTypes.array
};

export default BarChart;
