import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const Paragraph = styled.p`
font-family: "Merriweather", "Georgia", serif;
font-size: 16px;
font-weight: bold;
`

const Span = styled.span`
color: #999999;
margin-top: 4px;
margin-bottom: 4px;
`

class AuthorName extends React.Component {
  render() {
    return (
      <div>
      <Paragraph>{this.props.name}</Paragraph>
      <Span>{this.props.followers} followers</Span>
      </div>
    );
  }
}

export default AuthorName;
