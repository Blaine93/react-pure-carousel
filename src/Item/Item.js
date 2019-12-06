import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.css';

export const Item = ({
  children,
  className = null,
  isActive,
  isNext,
  isPrev,
  isAnimated,
  duration = 1,
  backgroundColor
}) => {
  return (
    <div
      className={`${styles.carouselItem} ${
        isActive ? styles.active : ''
      } ${
        isNext ? styles.next : ''
      } ${
        isPrev ? styles.prev : ''
      } ${
        !isAnimated ? styles.notAnimated : ''
      } ${className || ''}`}
      style={{
        WebkitTransitionDuration: `${duration}s`,
        OTransitionDuration: `${duration}s`,
        transitionDuration: `${duration}s`,
        backgroundColor: backgroundColor || 'transparent'
      }}
    >
      {children}
    </div>
  );
};

Item.propTypes = {
  className: PropTypes.string,
  duration: PropTypes.number,
  isActive: PropTypes.bool.isRequired,
  isNext: PropTypes.bool.isRequired,
  isPrev: PropTypes.bool.isRequired,
  isAnimated: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  backgroundColor: PropTypes.string
};

Item.defaultProps = {
  isActive: false,
  isNext: false,
  isPrev: false,
  isAnimated: false,
  duration: 1,
  className: null,
  backgroundColor: null
};
