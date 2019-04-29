import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

configure({ adapter: new Adapter() });

describe('Component: App', () => {

  it('does not explode', () => {
    expect(
      shallow(
        <App />
      ).length
    ).toEqual(1);
  });

});
