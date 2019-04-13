import React from 'react';
import styled from 'styled-components';

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
`;

class BooksBy extends React.Component {
  render() {
    return (
      <Paragraph>Books By {this.props.name}</Paragraph>
    );
  }
}

export default BooksBy;
