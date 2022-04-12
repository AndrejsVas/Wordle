import React, { Component } from 'react'
import Challenge from './Challenge'
import './Challenge.css'
import challengeIcon from '../images/challenge-icon.jpg';


class ChallengePop extends Component {
    constructor(props) {
        super(props);
        this.state = {
          count: false
        };
      }
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        this.props.setUserName(this.state.value);
        event.preventDefault();
      }
      popupChange = () => {
        this.setState({ count: false });
    }
  render() {
    return (
      <div className='challengepop'>
          <img id='challenge-img' src={challengeIcon} alt="Challenge Icon" onClick={() => this.setState({ count: true })}></img>
        <Challenge trigger ={this.state.count} setTrigger ={this.popupChange}>
            <h1>Set your word:</h1>
            <input id="userName-input" type="text" value={this.state.value} onChange={this.handleChange}  />
            {/* No onClick event */}
            <input id="userName-submit" type="submit" value="Submit"  />

        </Challenge>
          </div>
    )
  }
}
export default ChallengePop