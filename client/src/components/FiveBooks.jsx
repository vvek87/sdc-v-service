import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const Image = styled.img`
  height: 85px;
  width: 60px;
`

class FiveBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [],
    };

    this.onHover = this.onHover.bind(this);
  }

  componentDidUpdate() {
    if (this.props.details !== undefined && this.state.details.length === 0) {
      this.setState({ details: this.props.details }, () => {
        console.log('this.props.details', this.props.details);
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
        {this.state.details.map(cover => <td><Image src={cover[0].cover_image}></Image></td>)}
        </table>


        <br></br>
      </div>

    );
  }
}

export default FiveBooks;
