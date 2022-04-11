import React, { Component } from 'react'
import UserStart from './UserStart';
import './UserStart.css'

class UserStartPop extends Component {
    constructor(props) {
        super(props);
        this.state = {
          countStart: true
        };
      }
      userChange = () => {
        this.setState({ countStart: false });
    }
  render() {
    return (
      <div className='userStartPop'>           
            <UserStart trigger ={this.state.countStart} setTrigger ={this.userChange}>
                    <h1>Enter your Username:</h1>                   
            </UserStart>        
      </div>
      
    )
  }
}
export default UserStartPop;