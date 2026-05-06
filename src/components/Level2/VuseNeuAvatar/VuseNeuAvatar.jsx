import React from 'react';
import PropTypes from 'prop-types';
import styles from './VuseNeuAvatar.module.scss';

interface VuseNeuAvatarProps {
  src?: String
}

/**
 * VuseNeuAvatar Component
 * 
 * مكون مُحوّل من Vuse Vue
 * المستوى: 2
 * 
 * @example
 * <VuseNeuAvatar />
 */
export const VuseNeuAvatar: React.FC<VuseNeuAvatarProps> = ({
  src
}) => {
  return (
    <div className={styles.container}>
      {/* TODO: تطبيق المكون */}
    </div>
  );
};

VuseNeuAvatar.displayName = 'VuseNeuAvatar';

VuseNeuAvatar.propTypes = {
  src: PropTypes.string
};

export default VuseNeuAvatar;
