import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.css';

export const Pagination = ({
  slides,
  className,
  activeSlide,
  ...props
}) => {
  const pageWidth = () => {
    const filteredSlides = slides.filter(item => !item.clone);
    return 100 / filteredSlides.length;
  };

  return (
    <div className={`${styles.pagination} ${className || ''}`} {...props}>
      {slides.map((slide, index) => (
        !slide.clone && (
          <div
            key={index}
            className={index === activeSlide || slides[activeSlide].actualInd === index ? styles.active : ''}
            style={{ width: `calc(${pageWidth()}% - 10px)` }}
          />
        )
      ))}
    </div>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  slides: PropTypes.array,
  activeSlide: PropTypes.number
};

Pagination.defaultProps = {
  className: null,
  slides: [],
  activeSlide: 0
};
