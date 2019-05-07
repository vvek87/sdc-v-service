import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const Image = styled.img`
  height: 96px;
  width: 60px;
`

const Title = styled.strong`
    color: 333333;
    font-size: 20px;
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
    font-size: 20px;
    line-height: 14px;
`

const Rate = styled.span`
  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: "black";
  font-size: 13px;
`

const Yellow = styled.span`
  color: #f45f42;
  `
const WantButton = styled.b`
  background-color: #409D69;
  border-radius: 3px;
  color: #fff;
  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  border-radius: 8px;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 20px;
`

const PreviewButton = styled.button`
  background-color: #f4f1ea;
  border: 1px solid #D6D0C4;
  font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
  font-size: 16px;
  border-radius: 3px;
  padding-bottom: 12px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  margin-top: 7px;
  color: #333333;
  `

const ToolTip = styled.span`
  border: 1px solid #f4f1ea;
  `

const Description = styled.p`
  width: 400px;
  color: black;
  font-family: "Merriweather", Georgia, "Times New Roman", serif;
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
        console.log('this.state.detais', this.state.details);
      });
    }
  }

  renderReview(rating) {
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
          {this.state.details.map((cover, i) => <td data-tip data-for={cover.title}><Image src={cover.cover_image}></Image>
            <ToolTip>
              <ReactTooltip id={cover.title} place='bottom' type='light' data-multiline='true' border='true' effect='solid' clickable={true}>
                <span><Title>{cover.title}</Title><br></br>
                  <Name>by {this.props.name}</Name><br></br>
                  <Gray><Yellow>{this.renderReview(cover.average_rating)}</Yellow> {cover.average_rating} avg rating &mdash; {cover.total_ratings} ratings &mdash; pub {cover.year}</Gray>
                  <Description>{cover.description}</Description>
                  <br></br>
                  <WantButton>Want to Read &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▾</WantButton><span>
                  </span><Rate>Rate this book&nbsp;&nbsp;&nbsp;&nbsp;</Rate><Default>★★★★★</Default>
                  <br></br>
                  <br></br>
                  <PreviewButton>Open Preview</PreviewButton></span>
                <br></br>
                <br></br>
              </ReactTooltip>
            </ToolTip></td>)}
        </table>
      </div>

    );
  }
}

export default FiveBooks;
