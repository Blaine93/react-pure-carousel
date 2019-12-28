import React from 'react';
import PropTypes from 'prop-types';
import {
  LEFT, RIGHT, TOP, BOTTOM
} from '../constants/direction';
import styles from '../styles.css';

export const Arrow = ({
  renderArrow,
  disabled,
  onClick,
  direction = LEFT,
  className,
  ...props
}) => {
  const arrowClassName = () => {
    switch (direction) {
      case LEFT:
        return styles.buttonArrowLeft;
      case TOP:
        return styles.buttonArrowTop;
      case BOTTOM:
        return styles.buttonArrowBottom;
      default:
        return styles.buttonArrowRight;
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${styles.buttonArrow} ${arrowClassName()} ${className || ''}`}
      disabled={disabled}
      {...props}
    >
      {renderArrow}
      {!renderArrow && <span className={styles.arrow} />}
    </button>
  );
};

Arrow.propTypes = {
  className: PropTypes.string,
  renderArrow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  direction: PropTypes.oneOf([LEFT, RIGHT, TOP, BOTTOM])
};

Arrow.defaultProps = {
  className: null,
  renderArrow: null,
  disabled: false,
  onClick: () => {},
  direction: 'left'
};
