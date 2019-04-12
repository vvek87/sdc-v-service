import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p`
  font-family: "Merriweather", "Georgia", serif;
  font-size: 16px;
  font-weight: bold;
`;
const Span = styled.span`
  color: #999999;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const Image = styled.img`
  border-radius: 50%;
  height: 95px;
  width: 80px;
`

class AuthorName extends React.Component {
  render() {
    return (
      <div>
        <span>
      <Image src={this.props.pic}></Image>
      <Paragraph>{this.props.name}</Paragraph>
      <Span>{this.props.followers} followers</Span>
      </span>
      </div>
    );
  }
}

export default AuthorName;
