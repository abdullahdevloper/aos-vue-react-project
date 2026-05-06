import React from 'react';
import PropTypes from 'prop-types';
import styles from './ItemIcon.module.scss';

interface ItemIconProps {
  icon?: String
}

/**
 * ItemIcon Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <ItemIcon />
 */
export const ItemIcon: React.FC<ItemIconProps> = ({
  icon
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

ItemIcon.displayName = 'ItemIcon';

ItemIcon.propTypes = {
  icon: PropTypes.string
};

export default ItemIcon;
