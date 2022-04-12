import React from 'react'
import './Challenge.css'

function Challenge(props) {
    return (props.trigger) ? (
        <div className='challenge'>
            <div className='challenge-inner'>
                <button className='close-btn' onClick={()=> props.setTrigger({count:false})}><span aria-hidden="true">&times;</span></button>
                {props.children}
            </div>
        </div>
      ) : "";
}
export default Challenge