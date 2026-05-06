import React from 'react';
import PropTypes from 'prop-types';
import styles from './LanguageSelection.module.scss';

interface LanguageSelectionProps {

}

/**
 * LanguageSelection Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <LanguageSelection />
 */
export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

LanguageSelection.displayName = 'LanguageSelection';

LanguageSelection.propTypes = {

};

export default LanguageSelection;
