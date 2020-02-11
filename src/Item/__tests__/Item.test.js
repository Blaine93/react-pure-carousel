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

  it('should have styles for backgroundColor, backgroundImage and alignItems', () => {
    const wrapper = shallow(
      <Item
        {...props}
        backgroundColor="#FF0000"
        backgroundImage="image_src"
        alignItems="bottom"
      />
    );
    const styles = wrapper.find('div').prop('style');
    expect(styles['backgroundImage']).toEqual('url(image_src)');
    expect(styles['backgroundColor']).toEqual('#FF0000');
    expect(styles['justifyContent']).toEqual('flex-end');
  });

  it('should apply received duration for item', () => {
    const wrapper = shallow(
      <Item
        {...props}
        duration={.3}
      />
    );
    const styles = wrapper.find('div').prop('style');
    expect(styles['WebkitTransitionDuration']).toEqual('0.3s');
    expect(styles['OTransitionDuration']).toEqual('0.3s');
    expect(styles['transitionDuration']).toEqual('0.3s');
  });
});
