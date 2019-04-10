import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const Paragraph = styled.p`
color: #181818;
font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
line-height: 18px;
`

class Biography extends React.Component {
  render() {
    return (
      <div>
        <Paragraph>{this.props.bio}</Paragraph>
      </div>
    );
  }
}

export default Biography;
