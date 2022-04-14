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
            guessedWordsAtAttempt: [[], [], [], [], [], []]
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

     startLoading = () => {
         this.loadStats();
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

            {this.props.multData != null ? <Modal show={this.props.showPop && this.props.challangeId !== null && this.state.thirdPop}>
                <Modal.Header className="flex-row">
                    <Modal.Title>Challange statistics:</Modal.Title>
                    <CloseButton variant="white" onClick={this.handleCloseThird} />
                </Modal.Header>
                <Modal.Body >
                    <div>
                        <div className='endgame-inner'>
                            <h1>Word: {this.props.multData.wordToGuess}</h1>
                            Number of players: {this.props.multData.numOfPlayersPlayed} <br /> <hr />
                            Guess Distibution <br />
                            1: {this.props.multData.usernameListGuessedAt1Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])} <br />
                            2: {this.props.multData.usernameListGuessedAt2Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])} <br />
                            3: {this.props.multData.usernameListGuessedAt3Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])} <br />
                            4: {this.props.multData.usernameListGuessedAt4Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])} <br />
                            5: {this.props.multData.usernameListGuessedAt5Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])} <br />
                            6: {this.props.multData.usernameListGuessedAt6Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])}
                        </div>
                    </div>
                </Modal.Body>
            </Modal> : null}
             </>
         )
     }
}
export default Endgame


// 1: {this.state.usernameListGuessedAt1Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])} <br />
// 2: {this.state.usernameListGuessedAt2Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])} <br/>
// 3: {this.state.usernameListGuessedAt3Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])} <br/>
// 4: {this.state.usernameListGuessedAt4Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])} <br/>
// 5: {this.state.usernameListGuessedAt5Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])} <br/>
// 6: {this.state.usernameListGuessedAt6Attempt.map(t => <span>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])}