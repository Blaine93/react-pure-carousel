import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.css';

export const Arrow = ({
  renderArrow,
  disabled,
  onClick,
  direction = 'left',
  className,
  ...props
}) => {
  const arrowClassName = () => {
    return direction === 'left' ? styles.buttonArrowLeft : styles.buttonArrowRight;
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
  direction: PropTypes.oneOf(['left', 'right'])
};

Arrow.defaultProps = {
  className: null,
  renderArrow: null,
  disabled: false,
  onClick: () => {},
  direction: 'left'
};
