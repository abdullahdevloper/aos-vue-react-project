import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavigationItem.module.scss';

interface NavigationItemProps {
  href?: String
}

/**
 * NavigationItem Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <NavigationItem />
 */
export const NavigationItem: React.FC<NavigationItemProps> = ({
  href
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

NavigationItem.displayName = 'NavigationItem';

NavigationItem.propTypes = {
  href: PropTypes.string
};

export default NavigationItem;
