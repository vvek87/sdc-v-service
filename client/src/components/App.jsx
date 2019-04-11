import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import About from './About.jsx';
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
      url: '/author',
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
        <About name={this.state.authorInfo.name}></About>
        <AuthorName name={this.state.authorInfo.name} followers={this.state.authorInfo.followers}></AuthorName>
        <FollowButton>Follow Author</FollowButton>
        <br></br>
        <Biography bio={this.state.authorInfo.biography}></Biography>
        <br></br>
       <BooksBy name={this.state.authorInfo.name}></BooksBy>
        <div>
          <FiveBooks books={this.state.authorInfo.titles} />
        </div>
      </div>
    );
  }
}


export default App;
