import React, { Component } from 'react'
import EndgameIn from './EndgameIn'

class Endgame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    totalNumberOfGames: 0,
    currentWinstreak: 0,
    longestWinstreak: 0,
    numberOfWins: 0,
    winrate: 0,
    guessedWordsAtAttempt: [0,0,0,0,0,0]
    };
  }

loadStats = () => {
  
  fetch('api/user/getStats?userName='+this.props.userName)
      .then(response => response.json())
      .then(data =>this.setState({
        totalNumberOfGames: data.totalNumberOfGames,
      currentWinstreak: data.currentWinstreak,
      longestWinstreak: data.longestWinstreak,
      numberOfWins: data.numberOfWins,
      winrate: data.winrate,
      guessedWordsAtAttempt: data.guessedWordsAtAttempt
      }));

}

  render() {
    if (this.props.isWin && !this.state.isLoading){
      this.setState({ isLoading: true});
      this.loadStats();
    }
    return (
      <div className='endgamepop'>        
          <EndgameIn trigger ={this.props.isWin} isWin={this.props.isWin}>
              <div className='endgame'>
                <div className='endgame-inner'>
                  <h1>You won</h1>
                  <p>Total Games: {this.state.totalNumberOfGames}</p>
                  <p>Winrate: {this.state.winrate}%</p>
                  <p>Current Winstreak: {this.state.currentWinstreak}</p>
                  <p>Longest Winstreak: {this.state.longestWinstreak}</p>
                  <p>Number of Wins: {this.state.numberOfWins}</p> <hr></hr>
                  <p>Guess Distibution</p>
                  <p>1: {this.state.guessedWordsAtAttempt[0]}</p>
                  <p>2: {this.state.guessedWordsAtAttempt[1]}</p>
                  <p>3: {this.state.guessedWordsAtAttempt[2]}</p>
                  <p>4: {this.state.guessedWordsAtAttempt[3]}</p>
                  <p>5: {this.state.guessedWordsAtAttempt[4]}</p>
                  <p>6: {this.state.guessedWordsAtAttempt[5]}</p>
                </div>            
              </div>
              
        </EndgameIn>
          
      </div>
      
    )
  }
}
export default Endgame