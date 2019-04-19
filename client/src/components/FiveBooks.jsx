import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const Image = styled.img`
  height: 85px;
  width: 60px;
`

const Strong = styled.strong`
    color: 333333;
    font-size: 18px;
    font-family: "Merriweather", "Georgia", serif;
`

const Name = styled.span`
  font-size: 16px;
  font-family: "Merriweather", "Georgia", serif;
  color: #333;
  `

const Gray = styled.p`
    color: #777777;
    font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
    font-size: 15px;
    line-height: 14px;
`

const Default = styled.span`
    color: #777777;
    font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
    font-size: 15px;
    line-height: 14px;
`

const Yellow = styled.span`
  color: #f45f42;
  `
const WantButton = styled.b`
  background-color: #409D69;
  color: white;
  font-size: 16px;
  border-radius: 8px;
  padding: 10px;
  margin: 5px;
`

const PreviewButton = styled.b`
  background-color: #f4f1ea;
  font-size: 16px;
  border-radius: 8px;
  padding: 10px;
  color: #333333;
  `

const ToolTip = styled.span`
  border: 1px solid #f4f1ea;
  `

class FiveBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      details: [],
    };

    this.renderReview = this.renderReview.bind(this);
  }

  componentDidUpdate() {
    if (this.props.details !== undefined && this.state.details.length === 0) {
      this.setState({ details: this.props.details }, () => {
        console.log('this.props.details', this.props.details);
      });
    }
  }

  renderReview (rating) {
    rating = Math.floor(rating);

    switch (rating) {
      case 1:
        return '★';
        break;
      case 2:
        return '★★';
        break;
      case 3:
        return '★★★';
        break;
      case 4:
        return '★★★★';
        break;
      case 5:
        return '★★★★★';
        break;
    }
  }

  render() {
    return (
      <div>
        <table>
        {this.state.details.map(cover => <td data-tip data-for='bookDetailsPopup'><Image src={cover[0].cover_image}></Image>
       <ToolTip><ReactTooltip delayHide={2000} id='bookDetailsPopup' place='bottom' type='light' data-multiline='true' data-border='true'>
 <span><Strong>{cover[0].title}</Strong><br></br><br></br>
 <Name>By: {this.props.name}</Name><br></br> <br></br>
 <Gray><Yellow>{this.renderReview(cover[0].average_rating)}</Yellow> avg rating - {cover[0].total_ratings} ratings - {cover[0].year}</Gray>
   <br></br>
   <WantButton>Want to Read  ▾</WantButton><span>  </span>Rate this book <Default>★★★★★</Default>
   <br></br>
   <br></br>
   <br></br>
   <PreviewButton>Open Preview</PreviewButton></span>
</ReactTooltip></ToolTip></td>)}
        </table>

      </div>

    );
  }
}

export default FiveBooks;


