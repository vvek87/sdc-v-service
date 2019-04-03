import React from 'react';
import $ from 'jquery';

class FiveBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      titles: [],
    };

    this.onHover = this.onHover.bind(this);
  }

  componentDidUpdate() {
    if (this.props.books !== undefined && this.state.titles.length === 0) {
      this.setState({ titles: this.props.books }, () => {
      });
    }
  }

  onHover(){
    $
  }

  render() {
    return (
      <div>
        {this.state.titles.map(title => <p>{title}</p>)}
        <br></br>
      </div>

    );
  }
}

export default FiveBooks;
