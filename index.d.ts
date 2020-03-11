/* tslint:disable:max-classes-per-file */
import * as React from 'react';

export class Carousel extends React.Component<ICarouselProps, ICarouselState> {
  public static Background: typeof Background;
  public static Item: typeof Item;
}

export type CarouselThemeProp = 'light' | 'dark';

export interface ICarouselProps {
  className?: string;
  duration?: number;
  theme?: CarouselThemeProp;
  interval?: number;
  looped?: boolean;
  prevArrow?: string | React.ReactNode;
  nextArrow?: string | React.ReactNode;
  hidePagination?: boolean;
  afterSlide?: () => void;
  beforeSlide?: () => void;
  vertical?: boolean;
  alignPaginationOpposite?: boolean;
  enableKeyboardControls?: boolean;
}

export interface ICarouselState {
  items: any[];
  activeSlide: number;
  animatedSlide: number;
  hasFocus: boolean;
}

export class Background extends React.Component<IBackgroundProps, {}> {}

export interface IBackgroundProps {
  className?: string;
  src?: string;
  color?: string;
}

export class Arrow extends React.Component<IArrowProps, {}> {}

export type ArrowDirectionProp = 'left' | 'right' | 'top' | 'bottom';

export interface IArrowProps {
  className?: string;
  renderArrow?: string | React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  direction?: ArrowDirectionProp;
}

export class Item extends React.Component<IItemProps, {}> {}

export interface IItemProps {
  className?: string;
  duration?: number;
  isActive?: boolean;
  isNext?: boolean;
  isPrev?: boolean;
  isAnimated?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
  alignItems?: string;
}

export class Pagination extends React.Component<IPaginationProps, {}> {}

export interface IPaginationProps {
  className?: string;
  slides: any[];
  activeSlide: number;
  vertical?: boolean;
  alignOpposite?: boolean;
}

/* tslint:enable */
