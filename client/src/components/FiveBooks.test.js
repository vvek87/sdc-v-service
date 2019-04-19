import React from 'react';
import { shallow } from 'enzyme';
import expect from '../../../chai';
import FiveBooks from './FiveBooks.jsx';

describe('<FiveBooks />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<FiveBooks />);
  });

  it('should initialize titles to an empty array', () => {
    expect(component).to.have.state('titles').to.eql([]);
  });

  it('contains the <FiveBooks /> component', () => {
    expect(component.contains(<p className="test">test</p>)).to.equal(true);
  });
});
