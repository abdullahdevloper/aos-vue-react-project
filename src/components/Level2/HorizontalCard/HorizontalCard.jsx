import React from 'react';
import PropTypes from 'prop-types';
import styles from './HorizontalCard.module.scss';

interface HorizontalCardProps {
  maxWidth?: String
}

/**
 * HorizontalCard Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <HorizontalCard />
 */
export const HorizontalCard: React.FC<HorizontalCardProps> = ({
  maxWidth
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

HorizontalCard.displayName = 'HorizontalCard';

HorizontalCard.propTypes = {
  maxWidth: PropTypes.string
};

export default HorizontalCard;
