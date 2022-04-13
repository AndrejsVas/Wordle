import React from "react";
import { Button } from 'react-bootstrap';

import MainGame from './MainGame';

function StartButton({ isGameStarted, setIsGameStarted, letters, guesses }) {
    if (isGameStarted) {
        return (
            <MainGame
                letters={letters}
                guesses={guesses}
            />
        )
    } else {
        return (
            <Button
                variant='outline-light'
                onClick={() => setIsGameStarted(true)}
            >
                Start Game
            </Button>
        )
    }
}

export default StartButton;