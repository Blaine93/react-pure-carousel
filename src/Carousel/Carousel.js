import React from 'react';
import PropTypes from 'prop-types';
import { Item } from '../Item';
import { Caption } from '../Caption';
import { Background } from '../Background';
import styles from '../styles.css';

export class Carousel extends React.Component {
  timer = null;

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      activeSlide: 0,
      animatedSlide: 0
    };
  }

  componentDidMount() {
    const { interval, duration } = this.props;
    if (interval) {
      this.timer = setInterval(() => this.next(), interval + (duration * 1000));
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { children } = props;

    if (children && Array.isArray(children)) {
      const isBackground = children.find((ch) => ch.type === Background);
      let itemsArr = children;
      if (isBackground) {
        children.forEach((ch) => {
          if (Array.isArray(ch)) {
            itemsArr = ch;
          }
        });
      }
      let items = itemsArr.filter((ch) => ch.type === Item);

      if (items.length === 2) {
        items = [
          ...items,
          ...[
            { ...items[0], clone: true, actualInd: 0 },
            { ...items[1], clone: true, actualInd: 1 }
          ]
        ];
      }

      return {
        ...state,
        items
      };
    }
    return state;
  }

  static Item = Item;

  static Caption = Caption;

  static Background = Background;

  prev() {
    this.setState((prevState) => ({
      activeSlide: prevState.activeSlide === 0 ? prevState.items.length - 1 : prevState.activeSlide - 1,
      animatedSlide: prevState.activeSlide
    }));
  }

  next() {
    this.setState((prevState) => ({
      activeSlide: prevState.activeSlide === prevState.items.length - 1 ? 0 : prevState.activeSlide + 1,
      animatedSlide: prevState.activeSlide
    }));
  }

  changeSlide(index) {
    this.setState({
      activeSlide: index
    });
  }

  get themeClass() {
    const { theme } = this.props;
    if (theme === 'dark') {
      return styles.dark;
    }
    return styles.light;
  }

  get pageWidth() {
    const { items } = this.state;
    const filteredItems = items.filter(item => !item.clone);
    return 100 / filteredItems.length;
  }

  _renderItem = (ch, index) => {
    const { duration } = this.props;
    const { items, activeSlide, animatedSlide } = this.state;
    return React.cloneElement(ch, {
      isPrev: activeSlide === 0 ? index === items.length - 1 : index === activeSlide - 1,
      isNext: activeSlide === items.length - 1 ? index === 0 : index === activeSlide + 1,
      isActive: index === activeSlide,
      isAnimated: index === activeSlide || index === animatedSlide,
      duration
    });
  }

  render() {
    const {
      className,
      children,
      looped,
      leftArrow,
      rightArrow
    } = this.props;
    const { items, activeSlide } = this.state;

    if (!children) {
      return <div />;
    }

    const itemsWithoutClones = items.filter(item => !item.clone);

    return (
      <div className={`${styles.carousel} ${this.themeClass} ${className || ''}`}>
        {Array.isArray(children) && children.filter((ch) => ch.type === Background)}
        {React.Children.map(items, (ch, index) => this._renderItem(ch, index))}
        <div className={styles.pagination}>
          {items.map((item, index) => (
            !item.clone && (
              <div
                key={index}
                className={index === activeSlide || items[activeSlide].actualInd === index ? styles.active : ''}
                style={{ width: `calc(${this.pageWidth}% - 10px)` }}
              />
            )
          ))}
        </div>
        {items.length > 1 && (
          <React.Fragment>
            <button
              onClick={() => this.prev()}
              type="button"
              className={`${styles.buttonArrow} ${styles.buttonArrowLeft}`}
              disabled={!looped && activeSlide === 0}
            >
              {leftArrow}
              {!leftArrow && <span className={`${styles.arrow} ${styles.arrowLeft}`} />}
            </button>
            <button
              onClick={() => this.next()}
              type="button"
              className={`${styles.buttonArrow} ${styles.buttonArrowRight}`}
              disabled={!looped && activeSlide === itemsWithoutClones.length - 1}
            >
              {rightArrow}
              {!rightArrow && <span className={`${styles.arrow} ${styles.arrowRight}`} />}
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Carousel.propTypes = {
  className: PropTypes.string,
  duration: PropTypes.number,
  theme: PropTypes.string,
  interval: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  looped: PropTypes.bool.isRequired,
  leftArrow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  rightArrow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
};

Carousel.defaultProps = {
  className: null,
  duration: 1,
  theme: 'light',
  interval: null,
  children: null,
  looped: true,
  leftArrow: null,
  rightArrow: null
};
