import React from 'react';
import PropTypes from 'prop-types';
import styles from './CountDown.module.scss';

interface CountDownProps {

}

/**
 * CountDown Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <CountDown />
 */
export const CountDown: React.FC<CountDownProps> = ({
  
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

CountDown.displayName = 'CountDown';

CountDown.propTypes = {

};

export default CountDown;
