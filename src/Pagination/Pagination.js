import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.css';

export const Pagination = ({
  slides,
  className,
  activeSlide,
  vertical,
  alignOpposite,
  ...props
}) => {
  const pageWidth = () => {
    const filteredSlides = slides.filter(item => !item.clone);
    return 100 / filteredSlides.length;
  };

  return (
    <div className={`${styles.pagination} ${alignOpposite ? styles.opposite : ''} ${className || ''}`} {...props}>
      {slides.map((slide, index) => (
        !slide.clone && (
          <div
            key={index}
            className={index === activeSlide || slides[activeSlide].actualInd === index ? styles.active : ''}
            style={vertical ? { height: `calc(${pageWidth()}% - 10px)` } : { width: `calc(${pageWidth()}% - 10px)` }}
          />
        )
      ))}
    </div>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  slides: PropTypes.array,
  activeSlide: PropTypes.number,
  vertical: PropTypes.bool,
  alignOpposite: PropTypes.bool
};

Pagination.defaultProps = {
  className: null,
  slides: [],
  activeSlide: 0,
  vertical: false,
  alignOpposite: false
};
