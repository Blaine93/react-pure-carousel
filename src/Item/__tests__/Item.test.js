import React from 'react';
import { shallow, configure } from 'enzyme';
import clone from 'clone';
import Adapter from 'enzyme-adapter-react-16';
import { Item } from '../Item';
import components from '../../helpers/component-config';

configure({ adapter: new Adapter() });

describe('<Item />', () => {
  let props;
  beforeEach(() => {
    props = clone(components.Item.props);
  });

  it('should render', () => {
    const wrapper = shallow(<Item {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});
