import React from 'react';
import PropTypes from 'prop-types';
import styles from './Index.module.scss';

interface IndexProps {
  maxWidth?: unknown
}

/**
 * Index Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <Index />
 */
export const Index: React.FC<IndexProps> = ({
  maxWidth
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

Index.displayName = 'Index';

Index.propTypes = {
  maxWidth: PropTypes.unknown
};

export default Index;
