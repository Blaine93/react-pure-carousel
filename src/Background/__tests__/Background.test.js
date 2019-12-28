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

  it('should have styles for backgroundColor and backgroundImage', () => {
    const wrapper = shallow(
      <Background
        {...props}
        color="#FF0000"
        src="image_src"
      />
    );
    const styles = wrapper.find('div').prop('style');
    expect(styles['backgroundImage']).toEqual('url(image_src)');
    expect(styles['backgroundColor']).toEqual('#FF0000');
  });
});
