import React from 'react'
import './Endgame.css'

 function EndgameIn(props) {
    return (props.trigger) ? (
        <div className='endgameIn'>
            <div className='endgameIn-inner'>
                {props.children}
            </div>
        </div>
      ) : "";
}
export default EndgameIn