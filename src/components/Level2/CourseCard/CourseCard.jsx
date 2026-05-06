import React from 'react';
import PropTypes from 'prop-types';
import styles from './CourseCard.module.scss';

interface CourseCardProps {
  maxWidth?: unknown
}

/**
 * CourseCard Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <CourseCard />
 */
export const CourseCard: React.FC<CourseCardProps> = ({
  maxWidth
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

CourseCard.displayName = 'CourseCard';

CourseCard.propTypes = {
  maxWidth: PropTypes.unknown
};

export default CourseCard;
