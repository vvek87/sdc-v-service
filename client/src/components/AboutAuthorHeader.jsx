import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.span`
  color: #382110;
  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  height: 24px;
  width: auto;
  font-weight: bold;
  font-size: 15px;
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

class AboutAuthorHeader extends React.Component {
  render() {
    return (
      <div>
      <Paragraph>About {this.props.name}</Paragraph>
      {/* <div style="float: clear"></div> */}
      <HR></HR>
      </div>
    );
  }
}

export default AboutAuthorHeader;
