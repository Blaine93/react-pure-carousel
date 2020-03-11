import React from 'react';
import { shallow, configure } from 'enzyme';
import clone from 'clone';
import Adapter from 'enzyme-adapter-react-16';
import { Carousel } from '../Carousel';
import components from '../../helpers/component-config';

configure({ adapter: new Adapter() });

// mock requestAnimationFrame
global.window = global;

// mock event listeners
global.window.document.addEventListener = jest.fn();
global.window.document.removeEventListener = jest.fn();

jest.useFakeTimers();

describe('<Carousel />', () => {
  describe('unit tests', () => {
    describe('constructor()', () => {
      const instance = new Carousel();
      it('should initialize the state with the following shape', () => {
        expect(instance.state).toEqual({
          items: [],
          activeSlide: 0,
          animatedSlide: 0,
          hasFocus: false
        });
      });

      it('should null out timer', () => {
        expect(instance.timer).toBe(null);
      });

      it('should null out keyCodeMap', () => {
        expect(instance.keyCodeMap).toBe(null);
      });

      it('should apply keyCodeConfig', () => {
        expect(instance.keyCodeConfig).toEqual({
          nextSlide: [39, 68, 38, 87],
          previousSlide: [37, 65, 40, 83]
        });
      });
    });

    describe('componentDidMount()', () => {
      it('should add an event listener for handleKeyPress', () => {
        const instance = new Carousel({});
        instance.componentDidMount();
        expect(global.window.document.addEventListener).toHaveBeenCalledWith('keydown', instance.handleKeyPress, false);
      });

      it('should compose keyCodeMap', () => {
        const instance = new Carousel({});
        instance.componentDidMount();
        expect(instance.keyCodeMap).toEqual(instance.getKeyCodeMap(instance.keyCodeConfig));
      });

      it('should set setInterval for next slide', () => {
        const instance = new Carousel({ interval: 2000, duration: 1 });
        instance.componentDidMount();
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 3000);
      });
    });

    describe('componentWillUnmount()', () => {
      let instance;
      beforeEach(() => {
        instance = new Carousel();
        instance.componentWillUnmount();
      });

      it('should remove an event listener for handleKeyPress', () => {
        expect(global.window.document.removeEventListener).toHaveBeenCalledWith('keydown', instance.handleKeyPress, false);
      });

      it('should null out timer', () => {
        expect(instance.timer).toBe(null);
      });
    });
  });
  describe('integration tests', () => {
    let props;
    beforeEach(() => {
      props = clone(components.Carousel.props);
    });

    it('should render', () => {
      const wrapper = shallow(<Carousel {...props} />);
      expect(wrapper.exists()).toBe(true);
    });

    it('should have an aria focus when focused', () => {
      const wrapper = shallow(<Carousel {...props} />);
      expect(wrapper.state('hasFocus')).toBe(false);
      wrapper.find('.carousel').simulate('focus');
      wrapper.update();
      expect(wrapper.state('hasFocus')).toBe(true);
    });

    it('should remove the aria focus when blur after focus', () => {
      const wrapper = shallow(<Carousel {...props} />);
      expect(wrapper.state('hasFocus')).toBe(false);
      wrapper.find('.carousel').simulate('focus');
      wrapper.update();
      wrapper.find('.carousel').simulate('blur');
      wrapper.update();
      expect(wrapper.state('hasFocus')).toBe(false);
    });

    it('should set the "vertical" class name when orientation is "vertical"', () => {
      const wrapper = shallow(<Carousel {...props} vertical={true} />);
      expect(wrapper.find('.carousel').hasClass('vertical')).toBe(true);
    });
  });
});
