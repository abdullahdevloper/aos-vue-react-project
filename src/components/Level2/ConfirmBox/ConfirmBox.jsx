import React from 'react';
import PropTypes from 'prop-types';
import styles from './ConfirmBox.module.scss';

interface ConfirmBoxProps {

}

/**
 * ConfirmBox Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <ConfirmBox />
 */
export const ConfirmBox: React.FC<ConfirmBoxProps> = ({
  
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

ConfirmBox.displayName = 'ConfirmBox';

ConfirmBox.propTypes = {

};

export default ConfirmBox;
