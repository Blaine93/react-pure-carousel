import React from 'react';
import { shallow, configure } from 'enzyme';
import clone from 'clone';
import Adapter from 'enzyme-adapter-react-16';
import { Pagination } from '../Pagination';
import components from '../../helpers/component-config';

configure({ adapter: new Adapter() });

describe('<Pagination />', () => {
  let props;
  beforeEach(() => {
    props = clone(components.Pagination.props);
  });

  it('should render', () => {
    const wrapper = shallow(<Pagination {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Pagination.pageWidth should return 25 width for active Item', () => {
    const wrapper = shallow(
      <Pagination
        {...props}
        slides={[
          { clone: false },
          { clone: false },
          { clone: false },
          { clone: false }
        ]}
        activeSlide={0}
      />
    );
    expect(wrapper.find('.active').prop('style')).toHaveProperty('width', 'calc(25% - 10px)');
  });

  it('should display only 2 items', () => {
    const wrapper = shallow(
      <Pagination
        {...props}
        slides={[
          { clone: false },
          { clone: false },
          { actualInd: 0, clone: true },
          { actualInd: 1, clone: true }
        ]}
        activeSlide={0}
      />
    );
    expect(wrapper.find('.pagination div').find('div').length).toEqual(2);
  });

  it('should be active first item if clone with actualInd = 0 is active', () => {
    const wrapper = shallow(
      <Pagination
        {...props}
        slides={[
          { clone: false },
          { clone: false },
          { actualInd: 0, clone: true },
          { actualInd: 1, clone: true }
        ]}
        activeSlide={2}
      />
    );
    expect(wrapper.find('.pagination div').first('div').hasClass('active')).toBe(true);
  });
});
