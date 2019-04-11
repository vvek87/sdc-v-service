import React from 'react';
import styled from 'styled-components';
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
        <table>
        {this.state.titles.map(title => <td>{title}</td>)}
        </table>


        <br></br>
      </div>

    );
  }
}

export default FiveBooks;
