import React from 'react';
import PropTypes from 'prop-types';
import { addEvent, removeEvent } from '../helpers/utilities';
import { Item } from '../Item';
import { Caption } from '../Caption';
import { Background } from '../Background';
import { Arrow } from '../Arrow';
import { Pagination } from '../Pagination';
import {
  LEFT, RIGHT, TOP, BOTTOM
} from '../constants/direction';
import styles from '../styles.css';

export class Carousel extends React.Component {
  timer = null;

  keyCodeMap = null;

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      activeSlide: 0,
      animatedSlide: 0,
      hasFocus: false
    };
    this.keyCodeConfig = {
      nextSlide: [39, 68, 38, 87],
      previousSlide: [37, 65, 40, 83]
    };
  }

  componentDidMount() {
    const { interval, duration } = this.props;
    this.bindEvents();
    if (interval) {
      this.timer = setInterval(() => this.next(), interval + (duration * 1000));
    }
    this.keyCodeMap = this.getKeyCodeMap(this.keyCodeConfig);
  }

  componentWillUnmount() {
    this.unbindEvents();
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

  get prevActiveSlide() {
    const { activeSlide, items } = this.state;
    return activeSlide === 0 ? items.length - 1 : activeSlide - 1;
  }

  get nextActiveSlide() {
    const { activeSlide, items } = this.state;
    return activeSlide === items.length - 1 ? 0 : activeSlide + 1;
  }

  prev() {
    const newActiveSlide = this.prevActiveSlide;
    this.beforeSlideCallback(newActiveSlide);
    this.setState((prevState) => ({
      activeSlide: prevState.activeSlide === 0 ? prevState.items.length - 1 : prevState.activeSlide - 1,
      animatedSlide: prevState.activeSlide
    }), this.afterSlideCallback);
  }

  next() {
    const newActiveSlide = this.nextActiveSlide;
    this.beforeSlideCallback(newActiveSlide);
    this.setState((prevState) => ({
      activeSlide: prevState.activeSlide === prevState.items.length - 1 ? 0 : prevState.activeSlide + 1,
      animatedSlide: prevState.activeSlide
    }), this.afterSlideCallback);
  }

  get themeClass() {
    const { theme } = this.props;
    if (theme === 'dark') {
      return styles.dark;
    }
    return styles.light;
  }

  afterSlideCallback = () => {
    const { afterSlide, duration } = this.props;
    const { activeSlide } = this.state;
    setTimeout(() => afterSlide({ activeSlide }), duration * 1000);
  }

  beforeSlideCallback = (newActiveSlide) => {
    const { beforeSlide } = this.props;
    const { activeSlide } = this.state;
    beforeSlide({ activeSlide, newActiveSlide });
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

  handleFocus = () => {
    const { hasFocus } = this.state;
    if (!hasFocus) {
      this.setState({ hasFocus: true });
    }
  }

  handleBlur = () => {
    const { hasFocus } = this.state;
    if (hasFocus) {
      this.setState({ hasFocus: false });
    }
  }

  bindEvents = () => {
    addEvent(document, 'keydown', this.handleKeyPress);
  }

  unbindEvents = () => {
    removeEvent(document, 'keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    const { enableKeyboardControls } = this.props;
    const { hasFocus } = this.state;
    if (hasFocus && enableKeyboardControls) {
      const actionName = this.keyCodeMap[e.keyCode];
      switch (actionName) {
        case 'nextSlide':
          this.next();
          break;
        case 'previousSlide':
          this.prev();
          break;
        default:
          break;
      }
    }
  }

  getKeyCodeMap = (keyCodeConfig) => {
    const keyCodeMap = {};
    Object.keys(keyCodeConfig).forEach(actionName => {
      keyCodeConfig[actionName].forEach(
        keyCode => (keyCodeMap[keyCode] = actionName)
      );
    });
    return keyCodeMap;
  }

  render() {
    const {
      className,
      children,
      looped,
      prevArrow,
      nextArrow,
      hidePagination,
      afterSlide,
      beforeSlide,
      vertical,
      alignPaginationOpposite,
      theme,
      duration,
      enableKeyboardControls,
      ...props
    } = this.props;
    const { items, activeSlide } = this.state;

    if (!children) {
      return <div />;
    }

    const itemsWithoutClones = items.filter(item => !item.clone);

    return (
      <div
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        tabIndex={0}
        className={`${styles.carousel} ${this.themeClass} ${vertical ? styles.vertical : styles.horizontal} ${className || ''}`} {...props}
      >
        {Array.isArray(children) && children.filter((ch) => ch.type === Background)}
        {React.Children.map(items, (ch, index) => this._renderItem(ch, index))}
        {!hidePagination && <Pagination
          slides={items}
          activeSlide={activeSlide}
          vertical={vertical}
          alignOpposite={alignPaginationOpposite}
        />}
        {items.length > 1 && (
          <React.Fragment>
            <Arrow
              onClick={() => this.prev()}
              disabled={!looped && activeSlide === 0}
              renderArrow={prevArrow}
              direction={vertical ? TOP : LEFT}
            />
            <Arrow
              onClick={() => this.next()}
              disabled={!looped && activeSlide === itemsWithoutClones.length - 1}
              renderArrow={nextArrow}
              direction={vertical ? BOTTOM : RIGHT}
            />
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
  prevArrow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  nextArrow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  hidePagination: PropTypes.bool,
  afterSlide: PropTypes.func,
  beforeSlide: PropTypes.func,
  vertical: PropTypes.bool,
  alignPaginationOpposite: PropTypes.bool,
  enableKeyboardControls: PropTypes.bool
};

Carousel.defaultProps = {
  className: null,
  duration: 1,
  theme: 'light',
  interval: null,
  children: null,
  looped: true,
  prevArrow: null,
  nextArrow: null,
  hidePagination: false,
  afterSlide() {},
  beforeSlide() {},
  vertical: false,
  alignPaginationOpposite: false,
  enableKeyboardControls: true
};
