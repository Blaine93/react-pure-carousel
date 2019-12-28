import React from 'react';
import { shallow, configure } from 'enzyme';
import clone from 'clone';
import Adapter from 'enzyme-adapter-react-16';
import { Caption } from '../Caption';
import components from '../../helpers/component-config';

configure({ adapter: new Adapter() });

describe('<Caption />', () => {
  let props;
  beforeEach(() => {
    props = clone(components.Caption.props);
  });

  it('should render', () => {
    const wrapper = shallow(<Caption {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should align content at the top', () => {
    const wrapper = shallow(
      <Caption
        {...props}
        alignItems="top"
      />
    );
    const styles = wrapper.find('div').prop('style');
    expect(styles['justifyContent']).toEqual('flex-start');
  });

  it('should align content at the top', () => {
    const wrapper = shallow(
      <Caption
        {...props}
        alignItems="top"
      />
    );
    const styles = wrapper.find('div').prop('style');
    expect(styles['justifyContent']).toEqual('flex-start');
  });

  it('should align content at the bottom', () => {
    const wrapper = shallow(
      <Caption
        {...props}
        alignItems="bottom"
      />
    );
    const styles = wrapper.find('div').prop('style');
    expect(styles['justifyContent']).toEqual('flex-end');
  });
});
