import React, { Component } from 'react'
import UserStart from './UserStart';
import './UserStart.css'

class UserStartPop extends Component {
    constructor(props) {
        super(props);
        this.state = {
          countStart: true,
          value: this.props.userName
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        this.props.setUserName(this.state.value);
        event.preventDefault();
      }
      userChange = () => {
        this.setState({ countStart: false });
    }
  render() {
    return (
      <div className='userStartPop'>           
            <UserStart trigger ={this.state.countStart} setTrigger ={this.userChange}>
                    <h1>Enter your Username:</h1> 
                    <form onSubmit={this.handleSubmit}>
                        <label>Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                    <input type="submit" value="Submit" />
                   </form>                  
            </UserStart>        
      </div>
      
    )
  }
}
export default UserStartPop;