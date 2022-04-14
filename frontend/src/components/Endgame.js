import React, { Component } from 'react'
import { Modal, Image, CloseButton, Button } from "react-bootstrap";

 class Endgame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isMulti: false,
            isSingle: false,
            multiplayerGameId: 1,
            firstPop: true,
            secondPop: false,
            thirdPop: false,
            guessedWordsAtAttempt: [[], [], [], [], [], []],
            usernameListGuessedAt1Attempt: '',
            usernameListGuessedAt2Attempt: '',
            usernameListGuessedAt3Attempt: '',
            usernameListGuessedAt4Attempt: '',
            usernameListGuessedAt5Attempt: '',
            usernameListGuessedAt6Attempt: ''
        };
    }
     loadStats = async () => {
         await fetch('/api/user/getStats?userName=' + this.props.userName)
            .then(response => response.json())
             .then(data => {
                 this.setState({
                     totalNumberOfGames: data.totalNumberOfGames,
                     currentWinstreak: data.currentWinstreak,
                     longestWinstreak: data.longestWinstreak,
                     numberOfWins: data.numberOfWins,
                     winrate: data.winrate,
                     guessedWordsAtAttempt: data.guessedWordsAtAttempt,
                     isLoading: false
                 })
             });      
      }
      loadStatsMultiplayer = () => {
          console.log();
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
     startLoading = () => {
         this.loadStats();
         if (this.props.challangeId !== null) { this.updateTimer = setInterval(() => this.loadStatsMultiplayer(), 1000); }
      }
      componentWillUnmount = () => {
        clearInterval(this.updateTimer);
      }

     handleCloseFirst = () => {
         this.setState({ firstPop: false, secondPop: true })
     }
     handleCloseSecond = () => {
         this.setState({ secondPop: false, thirdPop: true })
     }
     handleCloseThird = () => {
         this.setState({ thirdPop: false })
         clearInterval(this.updateTimer);
     }

     render() {

    return (
        <>
            <Modal show={this.props.showPop && this.state.firstPop} onEnter={this.startLoading}>
                <Modal.Header className="flex-row">
                    <Modal.Title>{this.props.isWin ? 'You won' : 'You loose'}</Modal.Title>
                    <CloseButton disabled={this.state.isLoading} variant="white" onClick={this.handleCloseFirst} />
                </Modal.Header>
                <Modal.Body>
                    <h2>{this.props.isWin ? 'Congratulations' : "Don't be upset, you can try again"}</h2>
                </Modal.Body>
            </Modal>

            <Modal show={this.props.showPop && this.state.secondPop && !this.state.isLoading}>
                <Modal.Header className="flex-row">
                    <Modal.Title>Your statistics:</Modal.Title>
                    <CloseButton variant="white" onClick={this.handleCloseSecond} />           
            </Modal.Header>
            <Modal.Body >
                <div>
                        <div className='endgame-inner'>
                            <h2>Your statistics:</h2>
                            Total Games: {this.state.totalNumberOfGames} <br />
                            Winrate: {this.state.winrate}% <br />
                            Current Winstreak: {this.state.currentWinstreak} <br />
                            Longest Winstreak: {this.state.longestWinstreak} <br />
                            Number of Wins: {this.state.numberOfWins} <hr />
                            Guess Distibution <br />
                            1: {this.state.guessedWordsAtAttempt[0]} <br />
                            2: {this.state.guessedWordsAtAttempt[1]} <br />
                            3: {this.state.guessedWordsAtAttempt[2]} <br />
                            4: {this.state.guessedWordsAtAttempt[3]} <br />
                            5: {this.state.guessedWordsAtAttempt[4]} <br />
                            6: {this.state.guessedWordsAtAttempt[5]}
                        </div>  
                </div>
            </Modal.Body>
            </Modal>
             </>
         )
     }
}
export default Endgame