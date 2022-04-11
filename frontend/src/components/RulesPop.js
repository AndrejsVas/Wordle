import React, { Component } from 'react'
import Rules from './Rules';
import './Rules.css'
import gray from '../images/Gray.png';
import green from '../images/Green.png';
import yellow from '../images/Yellow.png';
import questionMark from '../images/question_mark.png';

class RulesPop extends Component {
    constructor(props) {
        super(props);
        this.state = {
          count: false
        };
      }
      popupChange = () => {
        this.setState({ count: false });
    }
  render() {
    return (
      <div className='rulesPop'> 
          <img id='rules-img' src={questionMark} alt="Question mark" onClick={() => this.setState({ count: true })}></img>
          <Rules trigger ={this.state.count} setTrigger ={this.popupChange}>
                    <h1>Rules</h1>
                    <p>Guess 5-letter word in 6 attempts <br></br> <hr></hr>                   
                        <img src={green} alt="Green explanation"></img> <br></br>
                        If the letter is highlighted as <b>GREEN</b>, the letter position is correct. <br></br> <hr></hr>
                        <img src={yellow} alt="Yellow explanation"></img> <br></br>
                        If the letter is highlighted <b>YELLOW</b>, the letter is present in this word, but not in that position. <br></br><hr></hr>
                        <img src={gray} alt="Gray explanation"></img> <br></br> 
                        If the letter is highlighted as <b>GRAY</b>, the letter does not exist in this word.
                    </p>
                </Rules>
      </div>
      
    )
  }
}
export default RulesPop;
