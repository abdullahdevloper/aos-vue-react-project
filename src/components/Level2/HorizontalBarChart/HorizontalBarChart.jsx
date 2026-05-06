import React from 'react';
import PropTypes from 'prop-types';
import styles from './HorizontalBarChart.module.scss';

interface HorizontalBarChartProps {
  gradients?: Array
}

/**
 * HorizontalBarChart Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <HorizontalBarChart />
 */
export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  gradients
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

HorizontalBarChart.displayName = 'HorizontalBarChart';

HorizontalBarChart.propTypes = {
  gradients: PropTypes.array
};

export default HorizontalBarChart;
