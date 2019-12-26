import React from 'react';
import { shallow, configure } from 'enzyme';
import clone from 'clone';
import Adapter from 'enzyme-adapter-react-16';
import { Arrow } from '../Arrow';
import components from '../../helpers/component-config';

configure({ adapter: new Adapter() });

describe('<Arrow />', () => {
  let props;
  beforeEach(() => {
    props = clone(components.Arrow.props);
  });

  it('should render', () => {
    const wrapper = shallow(<Arrow {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});
