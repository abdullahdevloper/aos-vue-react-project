import React from 'react';
import PropTypes from 'prop-types';
import styles from './VuseAvatar.module.scss';

interface VuseAvatarProps {
  src?: String
}

/**
 * VuseAvatar Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <VuseAvatar />
 */
export const VuseAvatar: React.FC<VuseAvatarProps> = ({
  src
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

VuseAvatar.displayName = 'VuseAvatar';

VuseAvatar.propTypes = {
  src: PropTypes.string
};

export default VuseAvatar;
