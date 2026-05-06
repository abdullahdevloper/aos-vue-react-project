import React from 'react';
import PropTypes from 'prop-types';
import styles from './DoughnutChart.module.scss';

interface DoughnutChartProps {
  gradientFill?: Array
}

/**
 * DoughnutChart Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <DoughnutChart />
 */
export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  gradientFill
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

DoughnutChart.displayName = 'DoughnutChart';

DoughnutChart.propTypes = {
  gradientFill: PropTypes.array
};

export default DoughnutChart;
