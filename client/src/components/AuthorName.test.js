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


// const songLinkProps = {
//   result: {
//     id: '6rPO02ozF3bM7NnOV4h6s2',
//     name: 'sf',
//     artist: 'sgs'
//   },
//   handleClick: () => {
//     console.log('click')
//   }
// }

// const component = shallow(<SongLink {...songLinkProps} />)