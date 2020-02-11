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
  backgroundColor,
  backgroundImage,
  alignItems,
  ...props
}) => {
  const getStyles = () => {
    let styles = {};
    if (backgroundImage) {
      styles = { ...styles, backgroundImage: `url(${backgroundImage})` };
    }
    if (backgroundColor) {
      styles = { ...styles, backgroundColor };
    }
    if (duration) {
      styles = {
        ...styles,
        WebkitTransitionDuration: `${duration}s`,
        OTransitionDuration: `${duration}s`,
        transitionDuration: `${duration}s`
      };
    }
    if (alignItems) {
      let align = {
        'center': alignItems === 'center',
        'flex-start': alignItems === 'top',
        'flex-end': alignItems === 'bottom'
      };
      styles = { ...styles, justifyContent: Object.keys(align).find(index => align[index]) };
    }
    return styles;
  };

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
      style={getStyles()}
      {...props}
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
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  alignItems: PropTypes.string
};

Item.defaultProps = {
  isActive: false,
  isNext: false,
  isPrev: false,
  isAnimated: false,
  duration: 1,
  className: null,
  backgroundColor: null,
  backgroundImage: null,
  alignItems: 'center'
};
