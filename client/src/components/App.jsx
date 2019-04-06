import React from 'react';
import $ from 'jquery';
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
      method: 'POST',
      data: { bookId: 13 },
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
    // const listBooks = this.state.authorInfo.titles.map(title => <p>{title}</p>);
    console.log('this.state.authorInfo.titles', this.state.authorInfo.titles);
    return (
      <div>
        <h5>ABOUT {this.state.authorInfo.name}</h5>

        <h4>{this.state.authorInfo.name}</h4>
        <p>{this.state.authorInfo.followers} followers</p>
        <button>Follow Author</button>
        <br></br>
        <div>{this.state.authorInfo.biography}</div>
        <br></br>
        <p>Books by {this.state.authorInfo.name}</p>
        <div>
          <FiveBooks books={this.state.authorInfo.titles} />
        </div>
      </div>
    );
  }
}


export default App;
