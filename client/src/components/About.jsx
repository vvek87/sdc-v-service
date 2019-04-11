import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const Paragraph = styled.p`
color: #382110;
font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
height: 24px;
width: auto;
font-weight: bold;
font-size: 12px;
text-transform: uppercase;
padding: 2px 0;
border-bottom: 1px solid #D8D8D8;
`

class About extends React.Component {
  render() {
    return (
      <Paragraph>About {this.props.name}</Paragraph>
    );
  }
}

export default About;
