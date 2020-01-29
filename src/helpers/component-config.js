import React from 'react';

import { Carousel } from '../Carousel';
import { Background } from '../Background';
import { Item } from '../Item';
import { Caption } from '../Caption';
import { Arrow } from '../Arrow';
import { Pagination } from '../Pagination';

export default {
  Carousel: {
    component: Carousel,
    props: {
      duration: 1,
      theme: 'light',
      interval: 5000,
      children: <div className="element">Carousel</div>,
      looped: true,
      prevArrow: <span className="leftArrow">left</span>,
      nextArrow: <span className="rightArrow">right</span>,
      hidePagination: false,
      afterSlide: () => {},
      beforeSlide: () => {},
      vertical: false,
      alignPaginationOpposite: false,
      enableKeyboardControls: true
    },
  },
  Background: {
    component: Background,
    props: {
      src: 'path',
      color: '#FF0000'
    },
  },
  Item: {
    component: Item,
    props: {
      isActive: true,
      isNext: false,
      isPrev: false,
      isAnimated: true,
      duration: 1,
      backgroundColor: '#FF0000',
      backgroundImage: 'path'
    },
  },
  Caption: {
    component: Caption,
    props: {
      alignItems: 'center'
    }
  },
  Arrow: {
    component: Arrow,
    props: {
      renderArrow: 'hello',
      disabled: false,
      onClick: () => {},
      direction: 'left'
    }
  },
  Pagination: {
    component: Pagination,
    props: {
      slides: [],
      activeSlide: 0,
      vertical: false,
      alignOpposite: false
    }
  }
};
