import React from 'react';
import styled from 'styled-components';

const Name = styled.span`
  color: #382110;
  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  height: 24px;
  width: auto;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  padding: 2px 0;
  /* border-bottom: 1px solid #D8D8D8; */
`;

const HR = styled.hr`
    display: block;
    height: 1px;
    /* border: 0; */
    border-top: 1px solid #D8D8D8;
    margin: 0.5em 0;
    padding: 0;
    width: 400px;
`;

class BooksBy extends React.Component {
  render() {
    return (
      <div>
      <Name>Books By {this.props.name}</Name>
      <HR></HR>
      </div>
    );
  }
}

export default BooksBy;
