import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import AboutAuthorHeader from './AboutAuthorHeader.jsx'
import AuthorName from './AuthorName.jsx';
import Biography from './Biography.jsx';
import FollowButton from './FollowButton.jsx';
import BooksBy from './BooksBy.jsx';
import FiveBooks from './FiveBooks.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authorInfo: {},
    };

    this.getInfo = this.getInfo.bind(this);
  }


  getInfo() {
    $.ajax({
      url: 'http://localhost:3002/author',
      method: 'GET',
      // data: { bookId: 13 },
      success: (results) => {
        this.setState(
          {
            authorInfo: results,
          }, () => {
            console.log('this.state.authorInfo', this.state.authorInfo);
          });
      },
    });
  }


  componentDidMount() {
    this.getInfo();
  }

  render() {
    console.log('this.state.authorInfo.titles', this.state.authorInfo.titles);
    return (
      <div>
        <AboutAuthorHeader name={this.state.authorInfo.name}></AboutAuthorHeader>
        <AuthorName pic={this.state.authorInfo.author_image} name={this.state.authorInfo.name} followers={this.state.authorInfo.followers}></AuthorName>
        <FollowButton>Follow Author</FollowButton>
        <Biography name={this.state.authorInfo.name} bio={this.state.authorInfo.biography}></Biography>
       <BooksBy name={this.state.authorInfo.name}></BooksBy>
        <div>
          <FiveBooks details={this.state.authorInfo.bookDetails} />
        </div>
      </div>
    );
  }
}


export default App;
