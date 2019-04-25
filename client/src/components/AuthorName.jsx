import React from 'react';
import FollowButton from './FollowButton.jsx';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  /* font-size:0; */
`;

const Name = styled.p`
  font-family: "Merriweather", "Georgia", serif;
  font-size: 18px;
  font-weight: bold;
  /* float: left;
  display: inline; */
`;
const Followers = styled.p`
  color: #999999;
  /* float: left;
  display: inline; */
`;

const AuthorImage = styled.img`
  border-radius: 50%;
  height: 95px;
  width: 80px;
  /* display: inline;
  float: left; */
`

const Button = styled.button`
  background-color: #f4f1ea;
  color: #333333;
  border-radius: 3px;
  border: 1px solid #D6D0C4;
  font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
  font-size: 14px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
`;


class AuthorName extends React.Component {
  render() {
    return (

      // consider: https://developer.mozilla.org/en-US/docs/Web/CSS/clear
      <Div>
     <div>
      <AuthorImage src={this.props.pic}></AuthorImage>
      <Name>{this.props.name}</Name>
      <Followers>{this.props.followers} followers</Followers>
      <Button>Follow Author</Button>
      </div>
      </Div>

    );
  }
}

export default AuthorName;
