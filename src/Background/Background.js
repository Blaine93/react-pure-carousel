import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.css';

export const Background = ({
  src = null,
  className = null,
  color = null,
  ...props
}) => {
  const getStyles = () => {
    let styles = {};
    if (src) {
      styles = { ...styles, backgroundImage: `url(${src})` };
    }
    if (color) {
      styles = { ...styles, backgroundColor: color };
    }
    return styles;
  };

  return (
    <div
      className={`${styles.carouselBackground} ${className || ''}`}
      style={getStyles()}
      {...props}
    />
  );
};

Background.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  color: PropTypes.string
};

Background.defaultProps = {
  className: null,
  src: null,
  color: null
};
