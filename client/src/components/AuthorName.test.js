import React from 'react';
import { shallow } from 'enzyme';
import expect from '../../../chai';
import AuthorName from './AuthorName.jsx';

describe('<AuthorName />', () => {
  let component;
  const props = 'bob';

  beforeEach(() => {
    component = shallow(<AuthorName props={props}/>);
  });

  it('should render the Name styled component', () => {


    expect(component.find('AuthorImage')).to.have.lengthOf(1);
  });


});
