import React from 'react';
import $ from 'jquery';
import AboutAuthorHeader from './AboutAuthorHeader.jsx'
import AuthorName from './AuthorName.jsx';
import Biography from './Biography.jsx';
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
    const id = Number(window.location.pathname.split('/')[1]) || 1;
    console.log('id', id);
    $.ajax({
      url: `http://localhost:3002/author/${id}`,
      method: 'GET',
      success: (results) => {
        this.setState(
          {
            authorInfo: results,
          },
        );
      },
    });
  }

  componentDidMount() {
    this.getInfo();
  }

  render() {
    return (
      <div>
        <AboutAuthorHeader name={this.state.authorInfo.name}></AboutAuthorHeader>
        <AuthorName pic={this.state.authorInfo.author_image} name={this.state.authorInfo.name} followers={this.state.authorInfo.followers}></AuthorName>
        <Biography name={this.state.authorInfo.name} bio={this.state.authorInfo.biography}></Biography>
        <BooksBy name={this.state.authorInfo.name}></BooksBy>
        <div>
          <FiveBooks name={this.state.authorInfo.name} details={this.state.authorInfo.bookDetails} />
        </div>
      </div>
    );
  }
}


export default App;
