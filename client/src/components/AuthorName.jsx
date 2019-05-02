import React from 'react';
import FollowButton from './FollowButton.jsx';
import styled from 'styled-components';


// general note: use 'em' or 'rem' instead of 'px' (considered best practice    )
const Wrapper = styled.div`
  display: flex;
  /* font-size:0; */
`;

const Name = styled.div`
  font-family: "Merriweather", "Georgia", serif;
  font-size: 20px;
  font-weight: bold;
  /* float: left; */
  /* display: inline; */
`;
const Followers = styled.div`
  color: #999999;
  padding: 7px;
  /* float: left; */
  /* display: inline; */
`;

const AuthorImage = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  padding-top: 5px;
  padding-bottom: 10px;
  /* display: inline; */
  /* float: left; */
`

const Button = styled.button`
  background-color: #f4f1ea;
  color: #333333;
  border-radius: 3px;
  border: 1px solid #D6D0C4;
  font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
  font-size: 18px;
  padding-bottom: 12px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  width: 175px;
`;


class AuthorName extends React.Component {
  render() {
    return (

      // consider: https://developer.mozilla.org/en-US/docs/Web/CSS/clear
      <Wrapper>
     <div>
      <AuthorImage src={this.props.pic}></AuthorImage>
      <br></br>
      <Name>{this.props.name}</Name>
      <Followers>{this.props.followers} followers</Followers>
      <Button>Follow Author</Button>
      </div>
      </Wrapper>

    );
  }
}

export default AuthorName;
