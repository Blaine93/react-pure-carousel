import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.css';

export const Caption = ({
  children,
  className = null,
  alignItems
}) => {
  const getStyles = () => {
    let styles = {};
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

  getStyles();

  return (
    <div
      className={`${styles.carouselCaption} ${className || ''}`}
      style={getStyles()}
    >
      {children}
    </div>
  );
};

Caption.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  alignItems: PropTypes.string
};

Caption.defaultProps = {
  alignItems: 'center',
  className: null
};
