import React, { Component } from 'react'
import { Modal, Image, CloseButton, Button } from "react-bootstrap";

 class Endgame extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          isFinished: true,
          isMulti: false,
          isSingle: false,
          multiplayerGameId: 1
        };
      }
      loadStats = () => {
        // TODO Lift userName
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
      loadStatsMultiplayer = () => {
        // TODO Lift multiplayer ID
        fetch('api/multiplayerGame/stats?multiplayerGameId='+this.state.multiplayerGameId)
            .then(response => response.json())
            .then(data =>{this.setState({
              wordToGuess: data.wordToGuess,
              numOfPlayersPlayed: data.numOfPlayersPlayed,
              usernameListGuessedAt1Attempt: data.usernameListGuessedAt1Attempt,
              usernameListGuessedAt2Attempt: data.usernameListGuessedAt2Attempt,
              usernameListGuessedAt3Attempt: data.usernameListGuessedAt3Attempt,
              usernameListGuessedAt4Attempt: data.usernameListGuessedAt4Attempt,
              usernameListGuessedAt5Attempt: data.usernameListGuessedAt5Attempt,
              usernameListGuessedAt6Attempt: data.usernameListGuessedAt6Attempt
            });this.setState({isMulti: true});console.log(data)});     
      }

  render() {  

    // if (this.state.isMulti && !this.state.isLoading){
    //     this.setState({ isLoading: true});
    //     this.loadStatsMultiplayer();
    //   }

    // else if (this.state.isSingle && !this.state.isLoading){
    //     this.setState({ isLoading: true});
    //     this.loadStats();
    //   }   
      
    return (
        <>
        <Button onClick={this.loadStatsMultiplayer}>Click me</Button>
        {this.state.isSingle ? <Modal show={this.state.isSingle}>
            <Modal.Header className="flex-row">
                <Modal.Title>Endgame</Modal.Title>              
            </Modal.Header>
            <Modal.Body >
                <div>
                <div className='endgame-inner'>
                  <h1>You won</h1>
                  Total Games: {this.state.totalNumberOfGames} <br/>
                  Winrate: {this.state.winrate}% <br/>
                  Current Winstreak: {this.state.currentWinstreak} <br/>
                  Longest Winstreak: {this.state.longestWinstreak} <br/>
                  Number of Wins: {this.state.numberOfWins} <hr/>
                  Guess Distibution <br/>
                  1: {this.state.guessedWordsAtAttempt[0]} <br/>
                  2: {this.state.guessedWordsAtAttempt[1]} <br/>
                  3: {this.state.guessedWordsAtAttempt[2]} <br/>
                  4: {this.state.guessedWordsAtAttempt[3]} <br/>
                  5: {this.state.guessedWordsAtAttempt[4]} <br/>
                  6: {this.state.guessedWordsAtAttempt[5]}
                </div>  
                </div>
            </Modal.Body>
        </Modal> : null}

        {this.state.isMulti ? <Modal show={this.state.isMulti}>
            <Modal.Header className="flex-row">
                <Modal.Title>Endgame</Modal.Title>              
            </Modal.Header>
            <Modal.Body >
                <div>
                <div className='endgame-inner'>
                  <h1>Word: {this.state.wordToGuess}</h1>
                  Number of players: {this.state.numOfPlayersPlayed} <br/> <hr/>
                  Guess Distibution <br/>
                  1: {this.state.usernameListGuessedAt1Attempt} <br/>
                  2: {this.state.usernameListGuessedAt2Attempt} <br/>
                  3: {this.state.usernameListGuessedAt3Attempt} <br/>
                  4: {this.state.usernameListGuessedAt4Attempt} <br/>
                  5: {this.state.usernameListGuessedAt5Attempt} <br/>
                  6: {this.state.usernameListGuessedAt6Attempt}
                </div>  
                </div>
            </Modal.Body>
        </Modal> : null}
    </>
    )
  }
}
export default Endgame