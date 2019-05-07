import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  color: #181818;
  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 18px;
  width: 400px;
  font-size: 18px;
`;

const Name = styled.span`
  text-transform: uppercase;
  font-size: 18px;
`

const More = styled.span`
  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #00635d;
  font-size: 18px;
`

class Biography extends React.Component {
  render() {
    return (
      <div>
      <Paragraph><Name>{this.props.name} </Name>{this.props.bio}<More>...more</More></Paragraph>
      </div>
    );
  }
}

export default Biography;
