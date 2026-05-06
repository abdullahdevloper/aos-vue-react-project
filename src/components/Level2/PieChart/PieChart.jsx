import React from 'react';
import PropTypes from 'prop-types';
import styles from './PieChart.module.scss';

interface PieChartProps {

}

/**
 * PieChart Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <PieChart />
 */
export const PieChart: React.FC<PieChartProps> = ({
  
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

PieChart.displayName = 'PieChart';

PieChart.propTypes = {

};

export default PieChart;
