import React from 'react';
import PropTypes from 'prop-types';
import styles from './LineChart.module.scss';

interface LineChartProps {

}

/**
 * LineChart Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <LineChart />
 */
export const LineChart: React.FC<LineChartProps> = ({
  
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

LineChart.displayName = 'LineChart';

LineChart.propTypes = {

};

export default LineChart;
