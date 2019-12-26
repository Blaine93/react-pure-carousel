import React from 'react';
import { shallow, configure } from 'enzyme';
import clone from 'clone';
import Adapter from 'enzyme-adapter-react-16';
import { Carousel } from '../Carousel';
import components from '../../helpers/component-config';

configure({ adapter: new Adapter() });

describe('<Carousel />', () => {
  describe('integration tests', () => {
    let props;
    beforeEach(() => {
      props = clone(components.Carousel.props);
    });

    it('should render', () => {
      const wrapper = shallow(<Carousel {...props} />);
      expect(wrapper.exists()).toBe(true);
    });
  });
});
