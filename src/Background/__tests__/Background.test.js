import React from 'react';
import { shallow, configure } from 'enzyme';
import clone from 'clone';
import Adapter from 'enzyme-adapter-react-16';
import { Background } from '../Background';
import components from '../../helpers/component-config';

configure({ adapter: new Adapter() });

describe('<Background />', () => {
  let props;
  beforeEach(() => {
    props = clone(components.Background.props);
  });

  it('should render', () => {
    const wrapper = shallow(<Background {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});
